import * as sessionActions from '../../store/session';
import { Redirect, useParams  } from 'react-router-dom';
import React from "react";
import { useSelector } from 'react-redux';
import './UserHomePage.css'
import ServerSidebar from '../ServerSidebar';
import Friendlist from '../Friendlist';
import UserInfo from "../UserInfo";

const UserHomePage = () => {
    const {username} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to={`/login`}/>;
    if (sessionUser.username !== username) return <Redirect to={`/${sessionUser.username}`} />

    return (
        <div id="user-page">
            <ServerSidebar/>
            <Friendlist/>
            <UserInfo/>
        </div>
    )
}

export default UserHomePage;