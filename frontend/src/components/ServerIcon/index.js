import React from "react"
import './ServerIcon.css'

const ServerIcon = ({user}) => {

    return (
        <span className="server-icon">
            <p></p>
            {user.username.toUpperCase().slice(0,1)}
        </span>
    )
}

export default ServerIcon