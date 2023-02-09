import React from 'react';
import './UserLabel.css'

const Friendlabel = (props) => {
    return(
        <div className="user-label">
            {props.friend.username}
        </div>
    )
}

export default Friendlabel;