import React from "react";
import './UserInfo.css'
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
const UserInfo = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const handleLogout = async (e) => {
        e.preventDefault()
        await dispatch(sessionActions.logout());
        window.location.reload();
    }
    return (
        <div className="user-info">
            <p>{sessionUser.username}</p>
            <p onClick={handleLogout}>Logout</p>
        </div>
    )
}

export default UserInfo;