import { Redirect, useParams} from 'react-router-dom';
import { useSelector } from 'react-redux';
import ServerSidebar from '../ServerSidebar';
import MembersSidebar from '../MembersSidebar';
import UserInfo from "../UserInfo";
import './ServerPage.css'
import ServerChannels from '../ServerChannels';

const ServerPage = () => {
    const {serverId} = useParams();
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to={`/login`}/>;
    if(sessionUser.servers.find((server)=> server.id === serverId)) return <Redirect to={`/${sessionUser.username}`} />

    return (
        <div id="server-page">
        <ServerChannels/>
        <ServerSidebar servers={sessionUser.servers}/>        
        <MembersSidebar/>
        <UserInfo/>
        </div>
    )
}

export default ServerPage;