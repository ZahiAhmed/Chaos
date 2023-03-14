import { useState, useEffect } from "react";
import { useHistory, useParams, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createServer, fetchServer } from "../../store/servers";
import { reload } from "../../store/session";
import "./NewServerForm.css";

const NewServerForm = ({ sessionUser, setShowModal }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [serverName, setServerName] = useState(
    `${sessionUser.username}'s server`
  );
  const [description, setDescription] = useState();
  const [hidden, setHidden] = useState(true)

  useEffect (() => {
    if(!serverName || serverName.split(' ').length === serverName.length + 1){
      setHidden(true)
    }else{
      setHidden(false)
    }
  },[serverName])

  const handleForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    history.push("/");
    await dispatch(
      createServer({
        server_name: serverName,
        description: description,
        owner_id: sessionUser.id,
      })
    ).then(async () => {
        setShowModal(false);
        await history.push(`/servers/${sessionUser.servers[0].id + 1}`) //have to fix this line
    });
  };

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
          { hidden ? <span className="errors"> - Must have at least one character </span> : null}
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
        {hidden ? <button style={{opacity: "0.5"}} disabled >Create</button> : 
        <button type="submit">Create</button>
        }
      </form>
    </div>
  );
};

export default NewServerForm;
