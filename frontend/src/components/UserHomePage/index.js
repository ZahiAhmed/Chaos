import { Redirect, useParams  } from 'react-router-dom';
import React from "react";
import { useSelector } from 'react-redux';
import './UserHomePage.css'
import ServerSidebar from '../ServerSidebar';
import UserInfo from "../UserInfo";
import DMList from '../DMList';
import Friendlist from '../Friendlist';
import NavBar from '../NavBar';
import AddFriendPage from '../AddFriendPage';

const UserHomePage = () => {
    const {username} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to={`/login`}/>;
    if (sessionUser.username !== username) return <Redirect to={`/${sessionUser.username}`} />

    return (
        <div id="user-page">
            <NavBar/>
            <ServerSidebar/>
            <DMList/>
            <UserInfo/>
            <Friendlist/>
            <AddFriendPage userId={sessionUser.id}/>
        </div>
    )
}

export default UserHomePage;