import React from "react"
import { Link } from "react-router-dom"
import './ServerIcon.css'

const ServerIcon = ({server}) => {
    return (
        <button className="server-icon">
        <Link to={`/servers/${server.id}`}>
            {server.serverName.toUpperCase().slice(0,1)}
        </Link>
        </button>
    )
}

export default ServerIcon