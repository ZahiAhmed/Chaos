import React from 'react'

const ProfileNav = ({user}) => {


    // const info = 

    return (
        <nav className="user-nav">
            <h2>User Info</h2>
            <div className='member-since'>
                <p>CHAOS MEMBER SINCE</p>
                <p className='createdat'>{user.createdAt.slice(0,10)}</p>
            </div>
            {/* {info} */}
        </nav>
    )
}

export default ProfileNav