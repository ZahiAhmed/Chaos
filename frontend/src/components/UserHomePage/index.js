import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import './UserHomePage.css'

const UserHomePage = () => {
    const dispatch = useDispatch();
    let sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to={`/login`}/>;
    
    const handleLogout = async (e) => {
        e.preventDefault()
        await dispatch(sessionActions.logout());
        window.location.reload();
    }

    return (
        <div id="user-page">
        <button className='logout' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default UserHomePage;