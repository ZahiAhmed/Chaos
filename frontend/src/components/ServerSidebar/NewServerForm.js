import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createServer } from "../../store/servers";
import "./NewServerForm.css";

const NewServerForm = ({ sessionUser }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [serverName, setServerName] = useState(
    `${sessionUser.username}'s server`
  );
  const [description, setDescription] = useState();
  const handleForm = async (e) => {
    history.push('/')
    await dispatch(
      createServer({
        server_name: serverName,
        description: description,
        owner_id: sessionUser.id
      })
    ).then (async ()=>{
      await history.push(`/servers/${sessionUser.servers[0].id + 1}`)
    })
  }

  return (
    <div className="new-server-form">
      <h1 id="mainheader-form">Create your server</h1>
      <br />
      <p id="subheader-form">
        Give your new server a personality with a name and a description. You
        can always change it later
      </p>
      <br />
      <form id="submit-server" onSubmit={handleForm}>
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
            placeholder="optional"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <br />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NewServerForm;
