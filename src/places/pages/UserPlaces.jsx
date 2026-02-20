import { useParams } from "react-router-dom";
import PlaceList from "../components/PlaceList/PlaceList";
import ErrorModal from "../../shared/components/UIElments/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElments/Spinner/LoadingSpinner";
import "./UserPlaces.css";
import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

function UserPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const params = useParams();
  const userId = params.userid;
  const fetchPlaces = async () => {
    try {
      const responseData = await sendRequest(
        `${import.meta.env.VITE_BACKEND_URL}/places/user/${userId}`,
      );
      setLoadedPlaces(responseData.places);
    } catch (err) {}
  };
  useEffect(() => {
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeleteHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId),
    );
  };
  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedPlaces && (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />
      )}
    </>
  );
}

export default UserPlaces;
