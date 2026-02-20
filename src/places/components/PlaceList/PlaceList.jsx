import "./PlaceList.css";
import Card from "../../../shared/components/UIElments/Card/Card";
import PlaceItem from "../PlaceItem/PlaceItem";
import Button from "../../../shared/components/FormElements/Button/Button";
function PlaceList({ items, onDeletePlace }) {
  if (items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No Places found. Maybe create one?</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="place-list">
      {items.map((place) => {
        return (
          <PlaceItem key={place.id} item={place} onDelete={onDeletePlace} />
        );
      })}
    </ul>
  );
}

export default PlaceList;
