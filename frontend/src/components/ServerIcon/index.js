import React from "react";
import { Link } from "react-router-dom";
import "./ServerIcon.css";

const ServerIcon = ({ server, id, location }) => {
  return (
    <Link to={`/servers/${server?.id}`}>
      <button
        style={
          location.includes(`servers/${server?.id}`) ? { backgroundColor: "red" , borderRadius: "20px" , color: "white"} : null
        }
        id={id}
        className="server-icon"
      >
        {server.serverName.toUpperCase().slice(0, 1)}
      </button>
    </Link>
  );
};

export default ServerIcon;
