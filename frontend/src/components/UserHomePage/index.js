import { Redirect, useParams  } from 'react-router-dom';
import {useState} from "react";
import { useSelector } from 'react-redux';
import './UserHomePage.css'
import ServerSidebar from '../ServerSidebar';
import UserInfo from "../UserInfo";
import DMList from '../DMList';
import Friendlist from '../Friendlist';
import AddFriendPage from '../AddFriendPage';

const UserHomePage = () => {
    const [hidden, setHidden] = useState(false)
    const {username} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to={`/login`}/>;
    if (sessionUser.username !== username) return <Redirect to={`/${sessionUser.username}`} />

    const page = hidden ? <AddFriendPage userId = {sessionUser.id}/> : <Friendlist hidden={hidden}/>

    return (
        <div id="user-page">
        <nav className="navbar">
            <button id='showfriends' onClick={e => (setHidden(false))}>Friends</button>
            <button id='addfriend' onClick={e => (setHidden(true))}>Add Friend</button>
        </nav>
            <ServerSidebar servers={sessionUser.servers}/>
            <DMList/>
            <UserInfo/>
            {page}
        </div>
    )
}

export default UserHomePage;