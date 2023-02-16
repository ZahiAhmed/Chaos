import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import session from './session';
import friendships from './friendships'
import users from './users'
import servers from './servers'
import members from './members'
import textChannels from './textChannels'
import messsages from './messages'
const rootReducer = combineReducers({
    session,
    friendships,
    users,
    servers,
    members,
    textChannels,
    messsages
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;