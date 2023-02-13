import React from "react";
import MembersLabel from "../MemberLabel";
import "./MembersSidebar.css";

const MembersSidebar = ({isOwner, members}) => {

  return (
    <aside className="server-members">
      {members.map((member, i) => (
        <MembersLabel key={i} member={member} isOwner={isOwner}/>
      ))}
    </aside>
  );
};

export default MembersSidebar;
