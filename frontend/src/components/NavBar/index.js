import React from "react";
import './NavBar.css'
const NavBar = () => {
    const showFriends = e => {
        e.preventDefault()
        document.querySelector('.addfriendpage').style.visibility = "hidden"
        document.querySelector('.friendlist').style.visibility = "visible"
    }

    const showAddFriend = e => {
        e.preventDefault()
        document.querySelector('.friendlist').style.visibility = "hidden"
        document.querySelector('.addfriendpage').style.visibility = "visible"
    }

    return (
        <div className="navbar">
            <button id='showfriends' onClick={showFriends}>Friends</button>
            <button id='addfriend' onClick={showAddFriend}>Add Friend</button>
        </div>
    )
}

export default NavBar