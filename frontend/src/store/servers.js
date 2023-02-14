const RECEIVE_SERVER = "servers/RECEIVE_SERVER";
const REMOVE_SERVER = "servers/REMOVE_SERVER";
const RECEIVE_SERVERS = "servers/RECEIVE_SERVERS";

const receiveServer = (server) => ({
  type: RECEIVE_SERVER,
  server,
});

const removeServer = (serverId) => ({
  type: REMOVE_SERVER,
  serverId,
});

const receiveServers = (servers) => ({
  type: RECEIVE_SERVERS,
  servers,
});

export const fetchServers =
  (search = "") =>
  async (dispatch) => {
    const response = await fetch("/api/servers");
    const servers = await response.json();
    const filteredServers = servers.filter((server) =>
      server.serverName.toLowerCase().includes(search.toLocaleLowerCase())
    );
    dispatch(receiveServers(filteredServers));
  };

export const fetchServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`);
  const server = await response.json();
  dispatch(receiveServer(server));
};

export const createServer = (server) => async (dispatch) => {
  const response = await fetch("api/servers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(server),
  });
  if (response.ok) {
    const server = await response.json();
    dispatch(receiveServer(server));
  }
};

export const updateServer = (server) => async (dispatch) => {
  const response = await fetch(`/api/servers/${server.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(server),
  });
  if (response.ok) {
    const server = await response.json();
    dispatch(receiveServer(server));
  }
};

export const deleteServer = (serverId) => async (dispatch) => {
  const response = await fetch(`/api/servers/${serverId}`, {
    method: "DELETE",
  });
  dispatch(removeServer(serverId));
};

const serversReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_SERVERS:
      return { ...action.servers };
    case REMOVE_SERVER:
      delete newState[action.serverId];
      return newState;
    case RECEIVE_SERVER:
      newState[action.server.id] = action.server;
      return newState;
    default:
      return state;
  }
};

export default serversReducer;
