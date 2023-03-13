import {Link} from "react-router-dom"
import { useDispatch } from "react-redux";
import { useState } from "react";
import { deleteTextChannel} from "../../store/textChannels"
import { Modal } from "../../context/Modal";
import { Redirect, useParams, useHistory } from "react-router-dom";

import "./TextChannelLabel.css"

const TextChannelLabel = ({textChannel, isOwner}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {serverId} = useParams();
    // const {channelId} = useParams();
    const [editModal, setEditModal] = useState(false);
    const currentChannel = true
    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await dispatch(deleteTextChannel(textChannel.id)).then(()=> {
            if(currentChannel){
                return <Redirect to={`/servers/${serverId}`} />
                // history.push(`/servers/${serverId}`)
            }
        })
    }

    const buttons = isOwner ? <div className="channel-buttons">

    <button className="channel-button" id="delete-channel" onClick={handleDelete}>x</button>
    <button className="channel-button" id="edit-channel" onClick={ (e) => setEditModal(true)}>✎</button>
    </div>
    : null
    return (
        <Link to={`/servers/${textChannel.serverId}/${textChannel.id}`}>
        <li> # {textChannel.topic} 
        {buttons}
        </li>
        </Link>
    )
}

export default TextChannelLabel;