import { combineReducers } from 'redux';

const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_MESSAGES':
      return action.payload;
    default:
      return state;
  }
};

const windowOpen = (
  state = {
    open: false,
    messageData: { conversationId: '', sentName: '', sentPic: '', sentId: '' },
  },
  action
) => {
  switch (action.type) {
    case 'OPEN_MESSAGE_WINDOW':
      return { open: true, messageData: action.payload };
    case 'CLOSE_MESSAGE_WINDOW':
      return { open: false, messageData: '' };
    default:
      return state;
  }
};

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

export default combineReducers({
  messagesReducer,
  windowOpen,
  textInput,
});
