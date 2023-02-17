export const RECEIVE_TEXT_CHANNEL = "textchannels/RECEIVE_TEXT_CHANNEL";
const REMOVE_TEXT_CHANNEL = "textchannels/REMOVE_TEXT_CHANNEL";
const RECEIVE_TEXT_CHANNELS = "textchannels/RECEIVE_TEXT_CHANNELS";

export const receiveTextChannel = (channel) => ({
    type: RECEIVE_TEXT_CHANNEL,
    channel,
  })

export const receiveTextChannels = (channels) => ({
    type: RECEIVE_TEXT_CHANNELS,
    channels,
  })

export const removeTextChannel = (channelId) => ({
    type: REMOVE_TEXT_CHANNEL,
    channelId,
  })

export const fetchTextChannels = (serverId) => async dispatch => {
  const response = await fetch(`/api/servers/${serverId}/text_channels`)
  const channels = await response.json();
  dispatch(receiveTextChannels(channels))
}


export const fetchTextChannel = (channelId) => async dispatch => {
  const response = await fetch(`/api/text_channels/${channelId}`)
  const channel = await response.json();
  dispatch(receiveTextChannel(channel))
}

export const createTextChannel = (channel) => async dispatch => {
  const response = await fetch("/api/text_channels", {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(channel)
  })
  const textChannel = await response.json();
  dispatch(receiveTextChannel(textChannel))
}

export const updateTextChannel = (channel) => async dispatch => {
  const response = await fetch(`/api/text_channels/${channel.id}`, {
    method: "PATCH",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(channel)
  })
  const textChannel = await response.json();
  dispatch(receiveTextChannel(textChannel))
}

export const deleteTextChannel = (channelId) => async dispatch => {
  const response = await fetch(`/api/text_channels/${channelId}`,{
    method: "DELETE"
  })
  dispatch(removeTextChannel(channelId))
}

const textChannelsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TEXT_CHANNEL:
      const {channel} = action;
      return { ...state, [channel.id]: channel };
    case RECEIVE_TEXT_CHANNELS:
      return { ...state, ...action.channels };
    case REMOVE_TEXT_CHANNEL:
      const newState = { ...state };
      delete newState[action.channelId];
      return newState;
    default:
      return state;
  }
};

export default textChannelsReducer;
