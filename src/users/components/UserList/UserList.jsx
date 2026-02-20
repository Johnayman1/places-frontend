import UserItem from "../UserItem/UserItem";
import "./UserList.css";

function UserList({ users }) {
  if (users.length === 0) {
    return (
      <div className="center">
        <h2>No Users Found.</h2>
      </div>
    );
  }
  return (
    <ul className="center">
      {users.map((user) => {
        return <UserItem key={user.id} user={user} />;
      })}
    </ul>
  );
}

export default UserList;
