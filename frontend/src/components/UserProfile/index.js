import React from 'react'
import './UserProfile.css'

const UserProfile = ({user}) => {


    return (
        <div className="user-modal">
            <div className="userprofile-info">
            <h1>{user.username}#{user.id}</h1>
            </div>
        </div>
    )
}

export default UserProfile