import { receiveMessages } from "./messages";
// import { receiveUsers } from "./users";
import csrfApiFetch from "./csrf";

const RECEIVE_TEXT_CHANNEL = "textchannels/RECEIVE_TEXT_CHANNEL";
const REMOVE_TEXT_CHANNEL = "textchannels/REMOVE_TEXT_CHANNEL";
const RECEIVE_TEXT_CHANNELS = "textchannels/RECEIVE_TEXT_CHANNELS";

export const receiveTextChannel = (channel) => {
  return {
    type: RECEIVE_TEXT_CHANNEL,
    channel,
  };
};

export const removeTextChannel = (channelId) => {
  return {
    type: REMOVE_TEXT_CHANNEL,
    channelId,
  };
};

export const fetchTextChannels = () => (dispatch) => {
  return csrfApiFetch("text_channels").then(({ channels }) => {
    dispatch({
      type: RECEIVE_TEXT_CHANNELS,
      channels,
    });
  });
};

export const fetchTextChannel = (id) => (dispatch) => {
  return csrfApiFetch(`text_channels/${id}`).then(({ channel, messages}) => {
    dispatch(receiveMessages(messages));
    dispatch(receiveTextChannel(channel));
    // dispatch(receiveUsers(users));
  });
};

export const createTextChannel = (channel) => (dispatch) => {
  return csrfApiFetch("text_channels", {
    method: "POST",
    data: { channel },
  }).then((channel) => dispatch(receiveTextChannel(channel)));
};

export const destroyTextChannel = (channelId) => (dispatch) => {
  return csrfApiFetch(`text_channels/${channelId}`, {
    method: "DELETE",
  }).then(() => dispatch(removeTextChannel(channelId)));
};

export const textChannelsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_TEXT_CHANNEL:
      const { channel } = action;
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
