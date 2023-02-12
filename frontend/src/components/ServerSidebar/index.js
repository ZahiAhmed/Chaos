import React from "react";
import ServerIcon from "../ServerIcon";
import { useSelector } from "react-redux";
import {useHistory } from "react-router-dom";
import './ServerSidebar.css'

const ServerSidebar = ({servers}) => {
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory();

    const handleClick = (e) => {
        e.preventDefault();
        history.push(`/${sessionUser.username}`)
    }

    return(
        <aside className="servers">
        <button id="home-button" className="server-icon" onClick={handleClick}>
        </button>
        <hr id="line"></hr>
            {servers.map((server, i) => <ServerIcon key={i} server={server}/>)}
        </aside>
    )
}

export default ServerSidebar;