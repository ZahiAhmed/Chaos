import * as sessionActions from '../../store/session';
import { Redirect } from 'react-router-dom';
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import './UserHomePage.css'

const UserHomePage = () => {
    const dispatch = useDispatch();
    let sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to={`/login`}/>;
    
    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(sessionActions.logout());
        window.location.reload();
    }

    return (
        <button className='logout' onClick={handleLogout}>Logout</button>
    )
}

export default UserHomePage;