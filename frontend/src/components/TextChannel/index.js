import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages, createMessage } from "../../store/messages";
import Message from "./Message";
import "./TextChannel.css";

const TextChannel = ({ channelId }) => {
  const dispatch = useDispatch();
  const textChannel = useSelector((state) =>
    state.textChannels ? state.textChannels[channelId] : {}
  );
  const messages = useSelector((state) =>
    state.messages ? Object.values(state.messages) : []
  );
  const [body, setBody] = useState("");

  useEffect(() => {
    dispatch(fetchMessages(channelId));
  }, [messages.length]);

  const handleMessage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      createMessage({
        channelId,
        body,
      })
    );
  };
  return (
    <section className="channel-box">
      <h1># {textChannel?.topic}</h1>
      <br/>
      <ul>
        {messages.map((message,i) => {
            console.log(message);
            <Message key={i} message={message}/>
        })}
      </ul>
      <br/>
      <form onSubmit={handleMessage}>
        <textarea
          placeholder={`Message #${textChannel?.topic}`}
          rows={body.split("\n").length}
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
  );
};

export default TextChannel;
