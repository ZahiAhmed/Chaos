import consumer from "../../consumer";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  receiveMessage,
  removeMessage,
  fetchMessages,
  createMessage,
} from "../../store/messages";
import Message from "./Message";
import "./TextChannel.css";

const TextChannel = ({ channelId }) => {
  const dispatch = useDispatch();
  const messageUlRef = useRef(null);
  const sessionUser = useSelector((state) => state.session.user);
  const textChannel = useSelector((state) =>
    state.textChannels ? state.textChannels[channelId] : {}
  );
  const messages = useSelector((state) =>
    state.messages ? Object.values(state.messages) : []
  );
  const [body, setBody] = useState("");

  useEffect(() => {
    dispatch(fetchMessages(channelId));
    scrollToBottom();
    const subscription = consumer.subscriptions.create(
      { channel: "TextsChannel", id: channelId },
      {
        received: ({ type, message, id }) => {
          switch (type) {
            case "RECEIVE_MESSAGE":
              dispatch(receiveMessage(message));
              console.log("frontend hit")
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
  }, [messages.length, channelId]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messageUlRef.current.scrollTo(0, messageUlRef.current.scrollHeight);
    }, 500);
  };

  const handleMessage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      createMessage({
        channelId,
        body,
      })
    );
    setBody("");
  };

  return (
    <>
      <section className="channel-box">
        <h1># {textChannel?.topic}</h1>
        <br />

        <div id="messages" ref={messageUlRef}>
          <h2 id="empty-channel-filler"># Welcome to {textChannel?.topic}</h2>
          <ul>
            {messages.map((message, i) => (
              <Message key={i} message={message} sessionUser={sessionUser} />
            ))}
          </ul>
        </div>

        <br />
        <form onSubmit={handleMessage}>
          <textarea
            id="message-input"
            placeholder={`Message #${textChannel?.topic}`}
            rows="1"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => {
              if (e.code === "Enter" && !e.shiftKey) {
                handleMessage(e);
              }
            }}
          ></textarea>
        </form>
      </section>
    </>
  );
};

export default TextChannel;
