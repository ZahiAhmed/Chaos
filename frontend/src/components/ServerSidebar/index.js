import React, { useState, useEffect } from "react";
import ServerIcon from "../ServerIcon";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import NewServerForm from "./NewServerForm";
import { Link } from "react-router-dom";
import { reload } from "../../store/session";
import "./ServerSidebar.css";

const ServerSidebar = ({ servers }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(reload());
  }, [sessionUser.servers.length]);

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
        <a target="_blank" href="https://github.com/ZahiAhmed">
          <button id="github" className="server-icon"></button>
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/zahiahmed/">
          <button id="linkedin" className="server-icon"></button>
        </a>
        <hr id="line"></hr>
        {servers.map((server, i) => (
          <ServerIcon key={i} server={server} />
        ))}
        <button
          id="addserver"
          className="server-icon"
          onClick={() => setShowModal(true)}
        >
          +
        </button>
        <Link to="/explore">
          <button id="redirect-explore" className="server-icon">
            {" "}
          </button>
        </Link>
      </aside>
      {showModal && (
        <Modal
          modal={"form-positioning"}
          modalBackground={"form-modal-background"}
          modalContent={"form-content"}
          onClose={() => setShowModal(false)}
        >
          <NewServerForm sessionUser={sessionUser} />
        </Modal>
      )}
    </>
  );
};

export default ServerSidebar;
