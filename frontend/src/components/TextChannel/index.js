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

  const scrollToBottom = () => {
    setTimeout(() => {
      messageUlRef.current.scrollTo(0, messageUlRef.current.scrollHeight);
    }, 500);
  };

  useEffect(() => {
    dispatch(fetchMessages(channelId));
    scrollToBottom();
    const subscription = consumer.subscriptions.create(
      { channel: "TextsChannel", id: channelId },
      {
        received: ({
          type,
          id,
          senderId,
          channelId,
          body,
          createdAt,
          updatedAt,
          sender
        }) => {
          const message = {
            id,
            senderId,
            channelId,
            body,
            createdAt,
            updatedAt,
            sender
          };
          switch (type) {
            case "RECEIVE_MESSAGE":
              dispatch(receiveMessage(message))
              scrollToBottom()
              break;
            case "UPDATE_MESSAGE":
              dispatch(receiveMessage(message));
              break;
            case "DESTROY_MESSAGE":
              dispatch(removeMessage(message.id));
              break;
            default:
              console.log("Unhandled broadcast: ", type);
              break;
          }
        },
      }
    );
    return () => subscription?.unsubscribe();
  }, []);



  const handleMessage = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(
      createMessage({
        channelId,
        body,
      })
    ).then(() => {
      setBody("");
      scrollToBottom();
    });
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
