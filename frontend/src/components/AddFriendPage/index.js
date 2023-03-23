import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { addFriend } from "../../store/friendships";
import "./AddFriendPage.css";

const AddFriendPage = (props) => {
  const dispatch = useDispatch();
  const confirmation = useSelector(state => state.friendships ? Object.values(state.friendships) : null)
  const [friend, setFriend] = useState("");
  let color;
  
  if(confirmation[confirmation?.length -1]?.errors){
    color = 'crimson'
  }
  
  if(confirmation[confirmation?.length -1]?.message){
    color = 'green'
  }

  const handleRequest = (e) => {
    e.preventDefault();
    setFriend("");
    return dispatch(addFriend({ user_id: props.userId, friend_id: friend }));
  };
  return (
    <div className="addfriendpage">
      <h1>ADD FRIEND</h1>
      <p>You can add a friend with their Discord tag</p>
      <form className="addfriendform" onSubmit={handleRequest} >
        <input
          type="text"
          value={friend}
          onChange={(e) => setFriend(e.target.value)}
          placeholder="Enter a username#id"
          className="request"
          style={confirmation[confirmation?.length -1]?.errors || confirmation[confirmation?.length-1]?.message ? {outline: `${color} solid 2px`} : null}
        />
        <span>
          <button type="submit">Send Friend Request</button>
        </span>
      </form>
      <p>
        {confirmation[confirmation?.length -1].errors?.map((error) => (
          <span key={error} style={{color: 'crimson'}}> {error}</span>
        ))}
        {confirmation[confirmation?.length -1].message?.map((msg) => (
          <span key={msg} style={{color: 'green'}}>{msg}</span>
        ))}
      </p>
    </div>
  );
};

export default AddFriendPage;
