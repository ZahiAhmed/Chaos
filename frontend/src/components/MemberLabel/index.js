import UserIcon from "../UserIcon";
import './MemberLabel.css'

const MemberLabel = ({member}) => {
    return (
        <div className="member-label">
            <UserIcon className={"member-icon"}/> {member.username}
        </div>
    )
}

export default MemberLabel;