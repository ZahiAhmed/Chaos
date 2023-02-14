import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createMember } from "../../store/members";
import UserIcon from "../UserIcon";
import { reload } from "../../store/session";
import "./ServerCard.css";

const ServerCard = ({ sessionUser, server }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const members = server.members ? server.members.length : null;
  const plural = members > 1 ? "members" : "member";
  const handleClick = (e) => {
    e.preventDefault();
    if (members) {
      dispatch(
        createMember({
          member_id: sessionUser.id,
          server_id: server.id,
          owner: false,
        })
      );
    }

    dispatch(reload()).then(() => {
      history.push(`/servers/${server.id}`);
    });
  };
  return (
    <div onClick={handleClick} className="server-card">
      <div id="card-header">
        <UserIcon className={"server-owner-icon"} />
        <br />
        <br />
        <h3>{server.serverName}</h3>
        <br />
        <p id="description">{server.description}</p>
        <p id="num-members">
          {members} {plural}
        </p>
      </div>
    </div>
  );
};

export default ServerCard;
