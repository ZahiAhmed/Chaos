import consumer from "../consumer";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  receiveMessage,
  removeMessage,
  fetchMessages,
  createMessage,
  deleteMessage,
} from "../../store/messages";
import { fetchTextChannel } from "../../store/textChannels";
// import { receiveMember } from '../../store/members';
import Message from "./Message";
import "./TextChannel.css";

const TextChannel = ({ channelId }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState("");
  const messages = useSelector((state) => (state.messages ? state.messages : []));
  const sessionUser = useSelector((state) => state.session.user);
  const channel = useSelector((state) => state.textChannels[channelId]);
  const activeMessageRef = useRef(null);
  const messageUlRef = useRef(null);
  const prevChannel = useRef(null);
  const numMessages = useRef(0);
  const activeMessageId = parseInt(history.location.hash.slice(1));

  useEffect(() => {
    if (activeMessageRef.current) scrollToMessage();
  }, [activeMessageId]);

  useEffect(() => {
    if (
      channelId === prevChannel.current &&
      numMessages.current < messages.length
    ) {
      if (history.location.hash) history.push(history.location.pathname);
      scrollToBottom();
    }
    numMessages.current = messages.length;
  }, [messages, channelId, history]);

  useEffect(() => {
    dispatch(fetchTextChannel(channelId));
    dispatch(fetchMessages(channelId)).then(() => {
      if (activeMessageRef.current) {
        scrollToMessage();
      } else {
        scrollToBottom();
      }
      prevChannel.current = channelId;
    });
  }, [channelId, dispatch]);

  useEffect(() => {
    const subscription = consumer.subscriptions.create(
      { channel: "TextChannelsChannel", id: channelId },
      {
        received: ({ type, message, id }) => {
          switch (type) {
            case "RECEIVE_MESSAGE":
              dispatch(receiveMessage(message));
              break;
            case "DESTROY_MESSAGE":
              dispatch(removeMessage(id));
              break;
            default:
              console.log("Unhandled broadcast: ", type);
              break;
          }
        },
      }
    );

    return () => subscription?.unsubscribe();
  }, [channelId, dispatch]);

  const scrollToMessage = () => {
    activeMessageRef.current.focus();
    activeMessageRef.current.scrollIntoView();
  };

  const scrollToBottom = () => {
    messageUlRef.current.scrollTop = messageUlRef.current.scrollHeight;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createMessage({ body, channelId, senderId: sessionUser.id }).then(() => {
      // dispatch(receiveMessage(message));
      // dispatch(receiveUser(user));
      setBody("");
    });
  };

  const handleDelete = (messageId) => {
    deleteMessage(messageId)
  };

  return (
    <section className="channel-box">
      <h1>{channel?.name}</h1>
      <ul ref={messageUlRef}>
        {messages.map((message) => (
          <li
            key={message.id}
            ref={activeMessageId === message.id ? activeMessageRef : null}
            tabIndex={-1}
          >
            <Message {...message} />
            {message.senderId === sessionUser.id && (
              <button
                className="btn-delete"
                onClick={() => handleDelete(message.id)}
              >
                x
              </button>
            )}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <textarea
          rows={body.split("\n").length}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={(e) => {
            if (e.code === "Enter" && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
          value={body}
        />
      </form>
    </section>
  );
};

export default TextChannel;
