import { useDispatch } from "react-redux";
import { updateServer } from "../../store/servers";
import { useState } from "react";
import "./EditServer.css";
const EditServer = ({ server }) => {
  const dispatch = useDispatch();
  const [serverName, setServerName] = useState(server.serverName);
  const [description, setDescription] = useState(server.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation()
    dispatch(
      updateServer({
        id: server.id,
        server_name: serverName,
        description: description,
        owner_id: server.ownerId
      })
    );
    window.location.reload();
  };
  return (
    <div className="edit-server-form">
      <h1 id="mainheader--editform">Edit server</h1>
      <br />
      <br />
      <form id="edit-submit-server" onSubmit={handleSubmit}>
        <label>
          SERVER NAME
          <br />
          <input
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          DESCRIPTION
          <br />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <br />
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditServer;
