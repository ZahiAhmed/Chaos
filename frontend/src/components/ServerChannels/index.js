import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteServer} from "../../store/servers";
import { deleteMember } from "../../store/members";
import { Modal } from "../../context/Modal";
import EditServer from "../EditServer";
import "./ServerChannels.css";
import "./SettingsModal.css"

const ServerChannels = ({ server, isOwner, members }) => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const serverName = server ? server.serverName : "";
  const buttonText = isOwner ? "Delete Server" : "Leave Server";
  const sessionUser = useSelector(state => state.session.user)

  const handleLeave = (e) => {
    e.preventDefault();
    if (isOwner) dispatch(deleteServer(server.id));
    if (!isOwner) dispatch(deleteMember(members[sessionUser.id].memberId))
  };
  const dropDown = isOwner ? (
    <div className="dropdown">
      <button id="edit" onClick={(e) => setShowModal(true)}>
        Edit Server
      </button>
      <button id="leave" onClick={handleLeave}>
        {buttonText}
      </button>
    </div>
  ) : (
    <div className="dropdown">
      <button id="leave" onClick={handleLeave}>
        {buttonText}
      </button>
    </div>
  );

  const show = hidden ? null : dropDown;

  return (
    <>
    <aside className="server-channels">
      <div id="server-header">
        <h1 className="server-title" onClick={(e) => setHidden(!hidden)}>
          {serverName}{" "}
        </h1>
      </div>
      {show}
    </aside>
      {showModal && (
        <Modal
          modal={"settings-positioning"}
          modalBackground={"settings-background"}
          modalContent={"edit-server-content"}
          onClose={() => setShowModal(false)}
        >
          <EditServer/>
        </Modal>
      )}
    </>
  )
};

export default ServerChannels;
