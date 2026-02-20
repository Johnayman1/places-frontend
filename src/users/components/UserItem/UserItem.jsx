import "./UserItem.css";
import Avatar from "../../../shared/components/UIElments/Avatar/Avatar";
import Card from "../../../shared/components/UIElments/Card/Card";
import { Link } from "react-router-dom";
function UserItem({ user }) {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${user.id}/places`}>
          <div className="user-item__image">
            <Avatar image={`${import.meta.env.VITE_ASSET_URL}/${user.image}`} alt={user.name} />
          </div>
          <div className="user-item__info">
            <h2>{user.name}</h2>
            <h3>
              {user.places.length === 1 ? "Place" : "Places"}{" "}
              {user.places.length}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}

export default UserItem;
