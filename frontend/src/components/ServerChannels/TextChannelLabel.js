import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { deleteTextChannel, updateTextChannel } from "../../store/textChannels";
import { Modal } from "../../context/Modal";
import { Redirect, useParams, useHistory } from "react-router-dom";

import "./TextChannelLabel.css";

const TextChannelLabel = ({ textChannel, isOwner }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { serverId } = useParams();
  const [channelTopic, setChannelTopic] = useState(textChannel.topic);
  const [editModal, setEditModal] = useState(false);
  const [hidden, setHidden] = useState(true)
  const currentChannel = true;

  useEffect (() => {
    if(!channelTopic || channelTopic.split(' ').length === channelTopic.length + 1){
      setHidden(true)
    }else{
      setHidden(false)
    }
  },[channelTopic])

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(deleteTextChannel(textChannel.id)).then(() => {
      if (currentChannel) {
        history.push(`/servers/${serverId}`); 
      }
    });
  };

  const handleEdit = (e) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(updateTextChannel({
        ...textChannel,
        topic: channelTopic
    }))
        setEditModal(false)
  }

  const buttons = isOwner ? (
    <span className="channel-buttons">
      <span title="delete channel">
        <button
          className="channel-button"
          id="delete-channel"
          onClick={handleDelete}
          >
          ❌
        </button>
      </span>

      <span title="edit channel">
        <button
          className="channel-button"
          id="edit-channel"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setEditModal(true)
        }}
        >
          ✎
        </button>
      </span>
    </span>
  ) : null;
  return (
    <>
    <Link to={`/servers/${textChannel.serverId}/${textChannel.id}`}>
      <li>
        {" "}
        <span className="channel-name"># {textChannel.topic}</span>
        {buttons}
      </li>
    </Link>
      {editModal && (
          <Modal
          modal={"settings-positioning"}
          modalBackground={"settings-background"}
          modalContent={"edit-server-content"}
          onClose={() => {
            setChannelTopic(textChannel.topic) 
            setEditModal(false)
        }}
          >
    <div className="edit-server-form">
      <h1 id="mainheader--editform"> Edit Channel </h1>
      <br />
      <form id="edit-submit-server" onSubmit={handleEdit}>
        <label>
          CHANNEL NAME
          { hidden ? <span className="errors"> - Must have at least one character </span> : null}
          <br />
          <input
            type="text"
            value={channelTopic}
            onChange={(e) => setChannelTopic(e.target.value)}
          />
        </label>
        <br />
        <br />
        {hidden ? <button style={{opacity: "0.5"}} disabled >Update Channel</button> : 
        <button type="submit">Update Channel</button>
        }
      </form>
    </div>
        </Modal>
      )}
      </>
  );
};

export default TextChannelLabel;
