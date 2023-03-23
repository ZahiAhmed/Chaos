import { useDispatch } from "react-redux";
import { createTextChannel } from "../../store/textChannels";
import { useState, useEffect } from "react";
import "../EditServer/EditServer.css";

const CreateChannel = ({numChannels, setNumChannels, server, setCreateModal }) => {
  const dispatch = useDispatch();
  const [channelTopic, setChannelTopic] = useState('');
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (
      !channelTopic ||
      channelTopic.split(" ").length === channelTopic.length + 1
    ) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  }, [channelTopic]);

  const handleForm = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(
      createTextChannel({
        server_id: server?.id,
        topic: channelTopic,
      })
    );
    setCreateModal(false);
    setNumChannels(numChannels+1)
  };

  return (
    <div className="edit-server-form">
      <h1 id="mainheader--editform"> Create Channel </h1>
      <br />
      <form id="edit-submit-server" onSubmit={handleForm}>
        <label>
          CHANNEL NAME
          {hidden ? (
            <span className="errors"> - Must have at least one character </span>
          ) : null}
          <br />
          <input
            type="text"
            value={channelTopic}
            onChange={(e) => setChannelTopic(e.target.value)}
          />
        </label>
        <br />
        <br />
        {hidden ? (
          <button style={{ opacity: "0.5" }} disabled>
            Create Channel
          </button>
        ) : (
          <button type="submit">Create Channel</button>
        )}{" "}
      </form>
    </div>
  );
};

export default CreateChannel;
