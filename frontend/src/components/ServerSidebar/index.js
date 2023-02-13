import React, { useState } from "react";
import ServerIcon from "../ServerIcon";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import NewServerForm from "./NewServerForm";
import "./ServerSidebar.css";

const ServerSidebar = ({ servers }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/${sessionUser.username}`);
  };

  return (
    <>
      <aside className="servers">
        <button
          id="home-button"
          className="server-icon"
          onClick={handleClick}
        ></button>
        <hr id="line"></hr>
        {servers.map((server, i) => (
          <ServerIcon key={i} server={server} />
        ))}
        <button className="server-icon" onClick={() => setShowModal(true)}>+</button>
      </aside>
      {showModal && (
        <Modal
          modal={"form-positioning"}
          modalBackground={"form-modal-background"}
          modalContent={"form-content"}
          onClose={() => setShowModal(false)}
        >
          <NewServerForm sessionUser={sessionUser}/>
        </Modal>
      )}
    </>
  );
};

export default ServerSidebar;
