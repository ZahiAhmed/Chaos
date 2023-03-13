import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServer } from "../../store/servers";
import { fetchMembers } from "../../store/members";
import { fetchTextChannels } from "../../store/textChannels";
import { useEffect } from "react";
import ServerSidebar from "../ServerSidebar";
import MembersSidebar from "../MembersSidebar";
import UserInfo from "../UserInfo";
import "./ServerPage.css";
import ServerChannels from "../ServerChannels";
import { reload } from "../../store/session";

const ServerPage = () => {
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector((state) =>
    state.servers ? state.servers[serverId] : {}
  );
  const members = useSelector((state) => (state.members ? state.members : {}));
  const textChannels = useSelector((state) =>
    state.textChannels ? Object.values(state.textChannels) : []
  );
  useEffect(() => {
    dispatch(fetchServer(serverId));
    dispatch(fetchMembers(serverId));
    dispatch(fetchTextChannels(serverId));
    dispatch(reload());
  }, [serverId, channelId, textChannels.length, server?.textChannels.length]);
  if(!channelId && server?.textChannels[0]) return <Redirect to={`/servers/${serverId}/${server?.textChannels[0].id}`} />
  if (!sessionUser) return <Redirect to={`/login`} />;
  if (sessionUser.servers.find((server) => server.id === serverId))
    return <Redirect to={`/${sessionUser.username}`} />;

  

  const isOwner = server ? sessionUser.id === server.ownerId : false;

  return (
    <div id="server-page">
      <ServerChannels server={server} isOwner={isOwner} members={members} textChannels={textChannels} />
      <ServerSidebar servers={sessionUser.servers} />
      <MembersSidebar isOwner={isOwner} members={Object.values(members)} />
      <UserInfo />
    </div>
  );
};

export default ServerPage;
