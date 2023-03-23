import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { addFriend } from "../../store/friendships";
import "./AddFriendPage.css";

const AddFriendPage = (props) => {
  const dispatch = useDispatch();
  const confirmation = useSelector(state => state.friendships ? Object.values(state.friendships) : null)
  const [friend, setFriend] = useState("");

  const handleRequest = (e) => {
    e.preventDefault();
    setFriend("");
    return dispatch(addFriend({ user_id: props.userId, friend_id: friend }));
  };
  return (
    <div className="addfriendpage">
      <h1>ADD FRIEND</h1>
      <p>You can add a friend with their Discord tag</p>
      <p>
        {confirmation[confirmation?.length -1].errors?.map((error) => (
          <span key={error}> {error}</span>
        ))}
      </p>
      <form className="addfriendform" onSubmit={handleRequest}>
        <input
          type="text"
          value={friend}
          onChange={(e) => setFriend(e.target.value)}
          placeholder="Enter a username#id"
          className="request"
        />
        <span>
          <button type="submit">Send Friend Request</button>
        </span>
      </form>
    </div>
  );
};

export default AddFriendPage;
