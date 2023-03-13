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

    const buttons = isOwner ? <span className="channel-buttons">


        <span title="delete channel">
    <button className="channel-button" id="delete-channel" onClick={handleDelete}>
        ❌
        </button>
        </span>
        <span title="edit channel">
    <button className="channel-button" id="edit-channel" onClick={ (e) => setEditModal(true)}>
        ✎
        </button>
        </span>
    </span>
    : null
    return (
        <Link to={`/servers/${textChannel.serverId}/${textChannel.id}`}>
        <li> <span className="channel-name">
             # {textChannel.topic} 
            </span>
        {buttons}
        </li>
        </Link>
    )
}

export default TextChannelLabel;