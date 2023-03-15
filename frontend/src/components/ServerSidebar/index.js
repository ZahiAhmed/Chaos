import React, { useState, useEffect } from "react";
import ServerIcon from "../ServerIcon";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal } from "../../context/Modal";
import NewServerForm from "./NewServerForm";
import { Link, useLocation } from "react-router-dom";
import { reload } from "../../store/session";
import "./ServerSidebar.css";

const ServerSidebar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  console.log(location);
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
          style={
            location.pathname.includes(sessionUser.username)
              ? { backgroundColor: "red"  , borderRadius: "20px"}
              : null
          }
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
        {sessionUser?.servers?.map((server, i) => (
          <ServerIcon key={i} server={server} location={location.pathname} />
        ))}
        <button
          style={showModal ? {backgroundColor: 'green',
        borderRadius: '20px'} : null}
          id="addserver"
          className="server-icon"
          onClick={() => setShowModal(true)}
        >
          +
        </button>
        <Link to="/explore">
          <button 
          style={location.pathname.includes('explore') ? {backgroundColor: 'green',
          borderRadius: '20px'} : null}
          id="redirect-explore" className="server-icon">
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
          <NewServerForm
            sessionUser={sessionUser}
            setShowModal={setShowModal}
          />
        </Modal>
      )}
    </>
  );
};

export default ServerSidebar;
