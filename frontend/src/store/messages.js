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


export const fetchMessages = (channelId) => async dispatch => {
  const response = await fetch(`/api/text_channels/${channelId}/messages`)
  const messages = await response.json();
  dispatch(receiveMessages(messages))
}


export const createMessage = (message) => async dispatch => {
  const response = await fetch('api/messages', {
    method: "POST",
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(message)
  })
  const messageContent = await response.json();
  dispatch(receiveMessage(messageContent))
}

  export const updateMessages = (message) => async (dispatch) => {
    const response = await fetch(`api/messages/${message.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(message),
    });
    const messageContent = await response.json();
    dispatch(receiveMessage(messageContent));
  };

  export const deleteMessage = messageId => async dispatch => {
      const response = await fetch(`/api/messages/${messageId}`, {
        method: "DELETE",
      });
      dispatch(removeMessage(messageId))
  } 

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
