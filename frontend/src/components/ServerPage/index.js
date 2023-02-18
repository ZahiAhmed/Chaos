import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServer } from "../../store/servers";
import { useEffect } from "react";
import ServerSidebar from "../ServerSidebar";
import MembersSidebar from "../MembersSidebar";
import UserInfo from "../UserInfo";
import "./ServerPage.css";
import ServerChannels from "../ServerChannels";
import { fetchMembers } from "../../store/members";
import { reload } from "../../store/session";
import { fetchTextChannels } from "../../store/textChannels";
import TextChannel from "../TextChannel";

const ServerPage = () => {
  const { serverId, channelId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector((state) =>
    state.servers ? state.servers[serverId] : {}
  );
  const channels = useSelector((state) =>
    state.textChannels ? Object.values(state.textChannels) : []
  );

  const members = useSelector((state) => (state.members ? state.members : {}));
  useEffect(() => {
      dispatch(fetchServer(serverId))
      dispatch(fetchMembers(serverId));
      dispatch(fetchTextChannels(serverId));
      dispatch(reload());
  }, [serverId]);
  
  if (!sessionUser) return <Redirect to={`/login`} />;
  if (sessionUser.servers.find((server) => !server.id === serverId))
    return <Redirect to={`/${sessionUser.username}`} />;
  if ((server) && (!channelId))
    return <Redirect to={`/servers/${server.id}/${channels[0].id}`} />;
  const Channel = channelId ? <TextChannel channelId={channelId} /> : null
  const isOwner = server ? sessionUser.id === server.ownerId : false;

  return (
    <div id="server-page">
      <ServerChannels
        server={server}
        isOwner={isOwner}
        members={members}
        channels={channels}
      />
      <ServerSidebar servers={sessionUser.servers} />
      <MembersSidebar isOwner={isOwner} members={Object.values(members)} />
      {Channel}
      <UserInfo />
    </div>
  );
};

export default ServerPage;
