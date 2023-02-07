import * as sessionActions from '../../store/session';
import { Redirect, useParams  } from 'react-router-dom';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import './UserHomePage.css'
import ServerSidebar from '../ServerSidebar';
import Friendlist from '../Friendlist';

const UserHomePage = () => {
    const dispatch = useDispatch();
    const {username} = useParams()
    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to={`/login`}/>;
    if (sessionUser.username !== username) return <Redirect to={`/${sessionUser.username}`} />
    const handleLogout = async (e) => {
        e.preventDefault()
        await dispatch(sessionActions.logout());
        window.location.reload();
    }

    return (
        <div id="user-page">
            <ServerSidebar/>
            <Friendlist/>
        <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default UserHomePage;