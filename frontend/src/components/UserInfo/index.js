import React, {useState} from "react";
import './UserInfo.css'
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from '../../store/session';
import UserIcon from "../UserIcon"
import { Modal } from "../../context/Modal";
import UserProfile from "../UserProfile";
const UserInfo = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [showModal, setShowModal] = useState(false);

    const handleLogout = async (e) => {
        e.preventDefault()
        await dispatch(sessionActions.logout());
        window.location.reload();
    }
    return (
      <>
        <div className="user-info">
          <UserIcon className={"user-info-icon"} />
          <button onClick={() => setShowModal(true)}>
            {sessionUser.username}
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
        {showModal && (
          <Modal
            modal={"profile-positioning"}
            modalBackground={"profile-modal-background"}
            modalContent={"profile-modal-content"}
            onClose={() => setShowModal(false)}
          >
            <UserProfile user={sessionUser} />
          </Modal>
        )}
      </>
    );
}

export default UserInfo;