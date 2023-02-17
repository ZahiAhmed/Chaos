import { useDispatch } from "react-redux";
import { deleteTextChannel } from "../../store/textChannels";
import { Link, useParams, useHistory } from "react-router-dom";
import "./TextChannelLabel.css";

const TextChannelLabel = ({ channel, isOwner }) => {
  const { channelId, serverId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (channelId == channel.id && dispatch(deleteTextChannel(channel.id))) {
      history.push(`/servers/${serverId}`);
    } else {
        dispatch(deleteTextChannel(channel.id))
    }
  };
  const button = isOwner ? (
    <button onClick={handleDelete} className="delete-channel-button">
      X
    </button>
  ) : null;

  return (
    <Link to={`/servers/${serverId}/${channelId}`}>
      # {channel.topic} {button}
    </Link>
  );
};

export default TextChannelLabel;
