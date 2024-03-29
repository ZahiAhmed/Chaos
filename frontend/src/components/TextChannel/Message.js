import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateMessage, deleteMessage } from "../../store/messages";
import { Modal } from "../../context/Modal";
import "./Message.css";

const Message = ({ message, sessionUser }) => {
  const dispatch = useDispatch();
  const [hidden, setHidden] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [body, setBody] = useState(message.body);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(deleteMessage(message.id))
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(updateMessage({id: message.id, body}))
    setEditModal(false)
  }

  useEffect(()=> {
    if(!body) {
        setHidden(true)
    }else{
        setHidden(false)
    }
  },[body])

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    ).getTime();
  
    const startOfYesterday = startOfDay - (1000 * 60 * 60 * 24);
  
    let formattedTime = date.toLocaleTimeString([], {
      timeStyle: 'short'
    });
  
    if (date.getTime() < startOfYesterday) {
      formattedTime = date.toDateString();
    } else if (date.getTime() < startOfDay) {
      formattedTime = `Yesterday at ${formattedTime}`;
    } else {
      formattedTime = `Today at ${formattedTime}`
    }
  
    return formattedTime;
  }

  const time = formatTime(message.createdAt)


  const buttons =
    sessionUser.id === message.senderId ? (
      <>
        <span title="delete message">
          <button
            className="channel-button"
            id="delete-channel"
            onClick={handleDelete}
          >
            ❌
          </button>
        </span>

        <span title="edit message">
          <button
            className="channel-button"
            id="edit-channel"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setBody(message.body)
              setEditModal(true);
            }}
          >
            ✎
          </button>
        </span>
      </>
    ) : null;

  return (
    <>
    <li className="message" style={ editModal ? {backgroundColor: "rgba(48, 53, 58, 0.198)"} : null } >
      <p id="message-sender">
        {message.sender} <span id="message-timestamp">{time ? time : null}</span>
        <span id="message-buttons">{buttons}</span>
      </p>
      <p id="message-body">
        {message.body}{" "}
        <span id="message-timestamp">
          {" "}
          {message.createdAt !== message.updatedAt ? "(edited)" : null}
        </span>
      </p>
    </li>
    {editModal && (
          <Modal
          modal={"settings-positioning"}
          modalBackground={"settings-background"}
          modalContent={"edit-server-content"}
          onClose={() => {
            setEditModal(false)
        }}
          >
    <div className="edit-server-form">
      <h1 id="mainheader--editform"> Edit Message </h1>
      <br />
      <form id="edit-submit-server" onSubmit={handleEdit}>
          { hidden ? <span className="errors"> - Delete Message? </span> : null}
          <br />
          <textarea
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter" && !e.shiftKey) {
                handleEdit(e);
              }
            }}
          ></textarea>
        <br />
        <br />
        { hidden ? <button style={{backgroundColor: "red"}} onClick={handleDelete}>Delete Message</button> : <button type="submit">Change Message</button>}
      </form>
    </div>
        </Modal>
      )}
      </>
  );
};

export default Message;
