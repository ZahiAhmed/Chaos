import { Redirect, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServer } from "../../store/servers";
import { useEffect} from "react";
import ServerSidebar from "../ServerSidebar";
import MembersSidebar from "../MembersSidebar";
import UserInfo from "../UserInfo";
import "./ServerPage.css";
import ServerChannels from "../ServerChannels";

const ServerPage = () => {
  const { serverId } = useParams();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const server = useSelector((state) =>
    state.servers ? state.servers[serverId] : {}
  );

  useEffect(() => {
    dispatch(fetchServer(serverId))
  }, [serverId]);


  if (!sessionUser) return <Redirect to={`/login`} />;
  if (sessionUser.servers.find((server) => server.id === serverId))
    return <Redirect to={`/${sessionUser.username}`} />;

  const isOwner = server ? sessionUser.id === server.ownerId : false

  return (
    <div id="server-page">
      <ServerChannels server={server} />
      <ServerSidebar servers={sessionUser.servers} />
      <MembersSidebar isOwner={isOwner}/>
      <UserInfo />
    </div>
  );
};

export default ServerPage;
