import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMessages, createMessage } from "../../store/messages";
import Message from "./Message";
import "./TextChannel.css";

const TextChannel = ({ channelId }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user )
  const textChannel = useSelector((state) =>
    state.textChannels ? state.textChannels[channelId] : {}
  );
  const messages = useSelector((state) =>
    state.messages ? Object.values(state.messages) : []
  );
  const [body, setBody] = useState("");

  useEffect(() => {
    dispatch(fetchMessages(channelId));
  }, [messages.length, channelId]);

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
        
        <div id="messages">

        <ul>
          {messages.map((message, i) => (
              <Message key={i} message={message} sessionUser={sessionUser}/>
              ))}   
        </ul>
        </div>

        <br />
      <form onSubmit={handleMessage}>
        <textarea id="message-input"
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
    </>
  );
};

export default TextChannel;
