import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {fetchServer} from "../../store/servers"
import './ServerChannels.css'

const ServerChannels = () => {
    const dispatch = useDispatch()
    const {serverId} = useParams();
    const server = useSelector(state => state.servers ? state.servers[serverId] : {})
    useEffect(()=>{
        dispatch(fetchServer(serverId))
    },[serverId])
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