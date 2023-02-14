import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServers } from "../../store/servers";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ServerSidebar from "../ServerSidebar";
import UserInfo from "../UserInfo";
import ExploreSidebar from "../ExploreSidebar";
import ServerCard from "./ServerCard";
import "./ExplorePage.css";

const ExplorePage = () => {  
  const dispatch = useDispatch();
  const servers = useSelector((state) => Object.values(state.servers))
  const sessionUser = useSelector((state) => state.session.user);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    dispatch(fetchServers(searchValue))
  }, [searchValue]);

  if (!sessionUser) return <Redirect to={`/login`} />;

  return (
    <div className="explore-page">
      <ExploreSidebar/>
      <ServerSidebar servers={sessionUser.servers} />
      <UserInfo />
      <div className="explore-content">
        <div className="wallpaper-div">
          <div className="inner-wallpaper">
            <h1>Find your community on Chaos</h1>
            <p>From gaming, to music, to learning, there's a place for you.</p>
            <input
              type="search"
              value={searchValue}
              placeholder="Explore communities"
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <div className="bottom-explore">
        <h2>Featured communities</h2>
        <div className="server-list">
          {servers.map((server, i) => (
              <ServerCard key={i} sessionUser={sessionUser} server={server} />
              ))}
        </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
