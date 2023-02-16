import {csrfApiFetch} from './csrf';

const RECEIVE_MESSAGE = "messages/RECEIVE_MESSAGE";
const RECEIVE_MESSAGES = "messages/RECEIVE_MESSAGES";
const REMOVE_MESSAGE = "messages/REMOVE_MESSAGE";

export const receiveMessage = (message) => ({
    type: RECEIVE_MESSAGE,
    message,
  })

export const receiveMessages = (messages) => ({
    type: RECEIVE_MESSAGES,
    messages,
  })

export const removeMessage = (messageId) => ({
    type: REMOVE_MESSAGE,
    messageId,
  })

export const getMessages = (channelId) => (state) => {
  return Object.values(state.messages)
    .filter((message) => message.channelId === parseInt(channelId))
    .map((message) => ({
      ...message,
      sender: state.users[message.senderId]?.username,
    }))
    .sort(({ createdAt: timeA }, { createdAt: timeB }) =>
      Math.sign(new Date(timeA).getTime() - new Date(timeB).getTime())
    );
};

export const createMessage = (message) =>
  csrfApiFetch("messages", {
    method: "POST",
    data: { message },
  });

  export const updateMessage = (message) =>
  csrfApiFetch("messages", {
    method: "PATCH",
    data: { message },
  });

export const destroyMessage = (messageId) =>
  csrfApiFetch(`messages/${messageId}`, {
    method: "DELETE",
  });

const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      const { message } = action;
      return { ...state, [message.id]: message };
    case RECEIVE_MESSAGES:
      return { ...state, ...action.messages };
    case REMOVE_MESSAGE:
      const newState = { ...state };
      delete newState[action.messageId];
      return newState;
    default:
      return state;
  }
};

export default messagesReducer;
