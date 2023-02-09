import React from 'react';
import { useDispatch } from 'react-redux';
import { unfriend } from '../../store/friendships';
import './UserLabel.css'

const UserLabel = (props) => {
    const dispatch = useDispatch();

    const handleUnfriend = (e) => {
        e.preventDefault();
        dispatch(unfriend(props.user.friendshipId))
    }
    return(
        <div className="user-label">
            {props.user.username}<span id="user-id">{`#${props.user.id}`}</span>
            <span>
            <button onClick={handleUnfriend}>Unfriend</button>
            <button>Profile</button>
            </span>
        </div>
    )
}

export default UserLabel;