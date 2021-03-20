import { combineReducers } from 'redux';

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.payload;
    default:
      return state;
  }
};

const windowOpen = (state = { open: false, conversationId: '' }, action) => {
  switch (action.type) {
    case 'OPEN_MESSAGE_WINDOW':
      return { open: true, conversationId: action.payload };
    case 'CLOSE_MESSAGE_WINDOW':
      return { open: false, conversationId: '' };
    default:
      return state;
  }
};

export default combineReducers({
  messagesReducer,
  windowOpen,
});
