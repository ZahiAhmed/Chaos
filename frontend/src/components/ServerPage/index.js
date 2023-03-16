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
import TextChannel from "../TextChannel";

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

  const sortedMembers = Object.values(members).sort((a, b) => new Date(a.joinedAt) - new Date(b.joinedAt));

  useEffect(() => {
    dispatch(fetchServer(serverId));
    dispatch(fetchMembers(serverId));
    dispatch(fetchTextChannels(serverId));
  }, [serverId]);


  if(!channelId && textChannels[0]?.id) return <Redirect to={`/servers/${serverId}/${textChannels[0].id}`} />
  if(channelId && textChannels[0]?.id) {
    let exists = false
    textChannels.filter(textChannel => {
      if(channelId === textChannel.id.toString()) exists = true;
    })
    if(!exists) return <Redirect to={`/servers/${serverId}/${textChannels[0].id}`} />
  }
  if (!sessionUser) return <Redirect to={`/login`} />;
  if (sessionUser.servers.find((server) => server.id === serverId))
    return <Redirect to={`/${sessionUser.username}`} />;


  const isOwner = server ? sessionUser.id === server.ownerId : false;

  return (
    <div id="server-page">
      <MembersSidebar isOwner={isOwner} members={sortedMembers} />
      <ServerSidebar servers={sessionUser.servers} />
      <ServerChannels server={server} isOwner={isOwner} members={members} textChannels={textChannels} />
      <UserInfo />
      <TextChannel channelId={channelId?.toString()} />
    </div>
  );
};

export default ServerPage;
