import {Link} from "react-router-dom"
import "./TextChannelLabel.css"

const TextChannelLabel = ({textChannel}) => {
    return (
        <Link to={`/servers/${textChannel.serverId}/${textChannel.id}`}>
        <li> # {textChannel.topic} </li>
        </Link>
    )
}

export default TextChannelLabel;