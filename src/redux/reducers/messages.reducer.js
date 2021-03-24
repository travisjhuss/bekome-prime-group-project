import { combineReducers } from 'redux';

// gets all messages from a conversation to populate message window
const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.payload;
    default:
      return state;
  }
};

// open tells browser whether to open or close browser so that it stays on various page views
// messageData gives the messaging component a providersID to start a new conversation or holds the conversation ID of an ongoing conversation
const windowOpen = (state = { open: false, messageData: {} }, action) => {
  switch (action.type) {
    case 'OPEN_MESSAGE_WINDOW':
      return { open: true, messageData: action.payload };
    case 'CLOSE_MESSAGE_WINDOW':
      return { open: false, messageData: '' };
    default:
      return state;
  }
};

// holds text to be sent to db
const textInput = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE_TEXT':
      return action.payload;
    case 'CLEAR_MESSAGE_TEXT':
      return '';
    default:
      return state;
  }
};

// combines three reducers that handle messaging. 
// each can be found at store.messages.messagesReducer, store.messages.windowOpen, store.messages.textInput
export default combineReducers({
  messagesReducer,
  windowOpen,
  textInput,
});
