import React from "react"
import { Link } from "react-router-dom"
import './ServerIcon.css'

const ServerIcon = ({server, id}) => {
    return (
        <Link to={`/servers/${server?.id}`}>
        <button id={id} className="server-icon">
            {server.serverName.toUpperCase().slice(0,1)}
        </button>
        </Link>
    )
}

export default ServerIcon