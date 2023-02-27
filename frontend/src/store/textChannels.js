export const RECEIVE_TEXT_CHANNEL = "textchannels/RECEIVE_TEXT_CHANNEL";
const REMOVE_TEXT_CHANNEL = "textchannels/REMOVE_TEXT_CHANNEL";
const RECEIVE_TEXT_CHANNELS = "textchannels/RECEIVE_TEXT_CHANNELS";

export const receiveTextChannel = (textChannel) => ({
    type: RECEIVE_TEXT_CHANNEL,
    textChannel,
  })

export const receiveTextChannels = (textChannels) => ({
    type: RECEIVE_TEXT_CHANNELS,
    textChannels,
  })

export const removeTextChannel = (textChannelId) => ({
    type: REMOVE_TEXT_CHANNEL,
    textChannelId,
  })

export const fetchTextChannels = (serverId) => async dispatch => {
  const response = await fetch(`/api/servers/${serverId}/text_channels`)
  const textChannels = await response.json();
  dispatch(receiveTextChannels(textChannels))
}


export const fetchTextChannel = (textChannelId) => async dispatch => {
  const response = await fetch(`/api/text_channels/${textChannelId}`)
  const textChannel = await response.json();
  dispatch(receiveTextChannel(textChannel))
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
      const {textChannel} = action;
      return { ...state, [textChannel.id]: textChannel };
    case RECEIVE_TEXT_CHANNELS:
      return { ...state, ...action.textChannels };
    case REMOVE_TEXT_CHANNEL:
      const newState = { ...state };
      delete newState[action.textChannelId];
      return newState;
    default:
      return state;
  }
};

export default textChannelsReducer;