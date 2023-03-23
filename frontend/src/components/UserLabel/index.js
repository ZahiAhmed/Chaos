import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unfriend, addFriend } from "../../store/friendships";
import { Modal } from "../../context/Modal";
import UserProfile from "../UserProfile";
import UserIcon from "../UserIcon";
import "./UserLabel.css";
import "./ProfileModal.css";

const UserLabel = ({ user }) => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

  },[user.confirmed])

  const handleConfirm = (e) => {
    e.preventDefault();
    dispatch(addFriend({ user_id: sessionUser.id, friend_id: `${user.username}#${user.id}` }));
  };
  const handleUnfriend = (e) => {
    e.preventDefault();
    dispatch(unfriend(user.friendshipId));
  };

  if(user.errors || user.messages) return <></>

  const pending = user.pending ? <span id="pending"> Pending... </span> : null;
  const confirmButton = !user.confirmed ? (
    <button id="addfriend" onClick={handleConfirm}>
      {" "}
      Accept{" "}
    </button>
  ) : null;

  return (
    <>
      <div className="user-label">
        <UserIcon className={"friendlist-icon"} />
        {user.username}
        <span id="user-id">{`#${user.id}`}</span>
        {pending}
        {confirmButton}
        <span className="user-options">
          {user.confirmed ?
          <button className="unfriend" onClick={handleUnfriend}>
            Unfriend
          </button>
          : 
          <button id="decline" className="unfriend" onClick={handleUnfriend}>
          Decline
        </button>
          }
          <button className="profile-button" onClick={() => setShowModal(true)}>
            Profile
          </button>
        </span>
      </div>
      {showModal && (
        <Modal
          modal={"profile-positioning"}
          modalBackground={"profile-modal-background"}
          modalContent={"profile-modal-content"}
          onClose={() => setShowModal(false)}
        >
          <UserProfile user={user} />
        </Modal>
      )}
    </>
  );
};

export default UserLabel;
