
import "./TextChannelLabel.css"

const TextChannelLabel = ({textChannel}) => {
    return (
        <li> # {textChannel.topic} </li>
    )
}

export default TextChannelLabel;