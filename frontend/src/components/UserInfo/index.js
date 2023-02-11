import React from "react";
import './UserInfo.css'
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import UserIcon from "../UserIcon"
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
            <UserIcon className={"user-info-icon"}/>
            <button>{sessionUser.username}</button>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default UserInfo;