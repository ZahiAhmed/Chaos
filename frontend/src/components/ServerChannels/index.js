import React from 'react'
import './ServerChannels.css'

const ServerChannels = ({server}) => {
    const serverName = server ? server.serverName : ''
    return(
        <aside className='server-channels'>
        <div>
        <h1 className="server-title">{serverName}</h1>
        </div>
    </aside>
    )
}

export default ServerChannels