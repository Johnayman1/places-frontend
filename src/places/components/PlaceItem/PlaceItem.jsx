import "./PlaceItem.css";
import Card from "../../../shared/components/UIElments/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import { useContext, useState } from "react";
import Modal from "../../../shared/components/UIElments/Modal/Modal";
import { AuthContext } from "../../../shared/context/auth-context";
import { useHttpClient } from "../../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import ErrorModal from "../../../shared/components/UIElments/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UIElments/Spinner/LoadingSpinner";

function PlaceItem({ item, onDelete }) {
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const navigate = useNavigate();

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteWarningHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        import.meta.env.VITE_BACKEND_URL+`/places/${item.id}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }, 
      );
      onDelete(item.id);
      navigate(`/${auth.userId}/places`);
    } catch (err) {}
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={item.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <h2>THE MAP!</h2>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteWarningHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteWarningHandler}>
              Cancel
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>Do you want to procced and delete this place ?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner />}
          <div className="place-item__image">
            <img src={`${import.meta.env.VITE_ASSET_URL}/${item.image}`} alt={item.title} />
          </div>
          <div className="place-item__info">
            <h2>{item.title}</h2>
            <h3>{item.address}</h3>
            <p>{item.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.isLoggedIn && auth.userId === item.creator && (
              <>
                <Button to={`/places/${item.id}`}>Edit</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
