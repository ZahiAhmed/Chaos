import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { unfriend } from '../../store/friendships';
import {Modal} from '../../context/Modal'
import UserProfile from '../UserProfile'
import './UserLabel.css'
import UserIcon from '../UserIcon';

const UserLabel = ({user}) => {
    const dispatch = useDispatch();
    const handleUnfriend = (e) => {
        e.preventDefault();
        dispatch(unfriend(user.friendshipId))
    }
    const [showModal, setShowModal] = useState(false);
    return(
        <>
        <div className="user-label">
            <UserIcon className={"friendlist-icon"}/>{user.username}<span id="user-id">{`#${user.id}`}</span>
            <span className="user-options">
            <button className="unfriend" onClick={handleUnfriend}>Unfriend</button>
            <button className="profile-button" onClick={()=> setShowModal(true)}>Profile</button>
            </span>
        </div>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <UserProfile user={user}/>
            </Modal>
        )}
        </>
    )
}

export default UserLabel;