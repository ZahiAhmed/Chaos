import React from 'react'
import ProfileNav from './ProfileNav'
import UserIcon from '../UserIcon';
import './UserProfile.css'

const UserProfile = ({user}) => {


    return (
        <div className="user-modal">
            <UserIcon className={"profile-icon"}/>
            <div className="userprofile-info">
            <h1>{user.username}<span>#{user.id}</span></h1>
            <ProfileNav user={user}/>
            </div>
        </div>
    )
}

export default UserProfile