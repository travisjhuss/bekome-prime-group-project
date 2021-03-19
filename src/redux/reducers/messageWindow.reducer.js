const messageWindowReducer = (
  state = { open: false, messageId: '' },
  action
) => {
  switch (action.type) {
    case 'OPEN_MESSAGE_WINDOW':
      return { open: true, messageId: action.payload };
    case 'CLOSE_MESSAGE_WINDOW':
      return { open: false, messageId: '' };
    default:
      return state;
  }
};

export default messageWindowReducer;
