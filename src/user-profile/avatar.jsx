export function UserAvatar(props) {
  return (
    <div>
      <img
        src={props.url}
        alt="user avatar"
        className="profile-userAvatar"
      ></img>
      <span>{props.name}</span>
    </div>
  );
}
