import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServers } from "../../store/servers";
import { useEffect} from "react";
import { Redirect } from "react-router-dom";
import ServerSidebar from "../ServerSidebar";
import UserInfo from "../UserInfo";

const ServerIndex = ()=> {

    const dispatch = useDispatch()
    const servers = useSelector(state => state.servers ? state.servers : {})
    const sessionUser = useSelector(state => state.session.user)
    
    useEffect(()=>{
        dispatch(fetchServers())
    },[])

    if (!sessionUser) return <Redirect to={`/login`} />;
    
    return(
        <div className="user-page">
            <ServerSidebar servers={sessionUser.servers}/>
            <UserInfo/>

        </div>
    )
}

export default ServerIndex