import { useDispatch } from "react-redux";
import { updateServer } from "../../store/servers";
import { useState, useEffect } from "react";
import "./EditServer.css";
const EditServer = ({ server, setEditModal }) => {
  const dispatch = useDispatch();
  const [serverName, setServerName] = useState(server.serverName);
  const [description, setDescription] = useState(server.description || '');
  const [hidden, setHidden] = useState(true)

  useEffect (() => {
    if(!serverName || serverName.split(' ').length === serverName.length + 1){
      setHidden(true)
    }else{
      setHidden(false)
    }
  },[serverName])

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
    )
    setEditModal(false)
  };
  return (
    <div className="edit-server-form">
      <h1 id="mainheader--editform">Edit server</h1>
      <br />
      <form id="edit-submit-server" onSubmit={handleSubmit}>
        <label>
          SERVER NAME
          { hidden ? <span className="errors"> - Must have at least one character </span> : null}
          <br/>
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
        {hidden ? <button style={{opacity: "0.5"}} disabled >Save Changes</button> : 
        <button type="submit">Save Changes</button>
        }
      </form>
    </div>
  );
};

export default EditServer;
