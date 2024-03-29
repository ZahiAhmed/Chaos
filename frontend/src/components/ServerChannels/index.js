import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { deleteServer } from "../../store/servers";
import { deleteMember } from "../../store/members";
import {reload} from "../../store/session"
import { Modal } from "../../context/Modal";
import EditServer from "../EditServer";
import CreateChannel from "../CreateChannel"
import TextChannelLabel from "./TextChannelLabel";
import "./ServerChannels.css";
import "./SettingsModal.css";

const ServerChannels = ({ server, isOwner, members, textChannels }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [hidden, setHidden] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const serverName = server ? server.serverName : "";
  const buttonText = isOwner ? "Delete Server" : "Leave Server";
  const sessionUser = useSelector((state) => state.session.user);
  const [numChannels, setNumChannels] = useState(server?.textChannels?.length)

  useEffect(()=>{

  },[numChannels])

  const handleLeave = (e) => {
    e.preventDefault();
    if (isOwner) dispatch(deleteServer(server.id));
    if (!isOwner) dispatch(deleteMember(members[sessionUser.id]));
    dispatch(reload())
    history.push(`/${sessionUser.username}`);
  };
  const dropDown = isOwner ? (
    <div className="dropdown" onClick={() => setHidden(true)}>
      <button id="edit" onClick={(e) => setEditModal(true)}>
        Edit Server
      </button>
      <button id="edit" onClick={(e) => setCreateModal(true)}>
        Create Channel
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
        <div id="server-channels">
          {textChannels.map((textChannel, i) => (
            <TextChannelLabel key={i} numChannels={numChannels} setNumChannels={setNumChannels} textChannel={textChannel} isOwner={isOwner} location={location.pathname}/>
          ))}
        </div>
      </aside>
      {editModal && (
        <Modal
          modal={"settings-positioning"}
          modalBackground={"settings-background"}
          modalContent={"edit-server-content"}
          onClose={() => setEditModal(false)}
        >
          <EditServer server={server} setEditModal={setEditModal} />
        </Modal>
      )}
      {createModal && (
        <Modal
          modal={"settings-positioning"}
          modalBackground={"settings-background"}
          modalContent={"edit-server-content"}
          onClose={() => setCreateModal(false)}
        >
          <CreateChannel numChannels={numChannels} setNumChannels={setNumChannels} server={server} textChannel={textChannels} setCreateModal={setCreateModal}/>
        </Modal>
      )}
    </>
  );
};

export default ServerChannels;
