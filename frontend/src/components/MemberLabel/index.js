import UserIcon from "../UserIcon";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Modal } from "../../context/Modal";
import { deleteMember } from '../../store/members';
import UserProfile from "../UserProfile";
import "./MemberLabel.css";
import "./MemberModal.css";
const MemberLabel = ({ member }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const sessionUser = useSelector (state => state.session.user)

  const handleKick = (e) => {
    e.preventDefault();
    dispatch(deleteMember(member.id))
  };

  const kickButton = sessionUser.id ?
    <button onClick={handleKick} className="remove-member-button">
      Kick
    </button> : null

  return (
    <>
      <div onClick={() => setShowModal(true)} className="member-label">
        <UserIcon className={"member-icon"} /> {member.username}
        {kickButton}
      </div>
      {showModal && (
        <Modal
          modal={"member-positioning"}
          modalBackground={"member-modal-background"}
          modalContent={"member-modal-content"}
          onClose={() => setShowModal(false)}
        >
          <UserProfile user={member} />
        </Modal>
      )}
    </>
  );
};

export default MemberLabel;
