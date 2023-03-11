import { useDispatch } from "react-redux";
import { createTextChannel } from "../../store/textChannels";
import { useState } from "react";
import "../EditServer/EditServer.css";
import { useHistory } from "react-router-dom";
const CreateChannel = ({ server }) => {
  const dispatch = useDispatch();
  const [channelTopic, setChannelTopic] = useState(null);
  const history = useHistory();
  const handleForm = async (e) => {
    history.push(`/servers/${server.id}/${server.textChannels[0].id}`);
    await dispatch(
      createTextChannel({
        server_id: server?.id,
        topic: channelTopic,
      })
    ).then(async () => {
      await history.push(
        `/servers/${server.id}/${
          server.textChannels[server.textChannels.length - 1].id
        }`
      );
    });
  };

  return (
    <div className="edit-server-form">
      <h1 id="mainheader--editform"> Create Channel </h1>
      <br />
      <form id="edit-submit-server" onSubmit={handleForm}>
        <label>
          CHANNEL NAME
          <br />
          <input
            type="text"
            value={channelTopic}
            onChange={(e) => setChannelTopic(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
};

export default CreateChannel;
