import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { addFriend } from "../../store/friendships";
import "./AddFriendPage.css";

const AddFriendPage = (props) => {
  const dispatch = useDispatch();
  const [friend, setFriend] = useState("");
  const [errors, setErrors] = useState([]);
  const handleRequest = (e) => {
    e.preventDefault();
    setFriend("");
    return dispatch(
      addFriend({ user_id: props.userId, friend_id: friend })
    ).catch(async (response) => {
      let data;
      try {
        data = await response.clone().json();
      } catch {
        data = await response.text();
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([response.statusText]);
    });
  };
  return (
    <div className="addfriendpage">
      <h1>ADD FRIEND</h1>
      <p>You can add a friend with their Discord tag</p>
      <p>
        {errors.map((error) => (
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
