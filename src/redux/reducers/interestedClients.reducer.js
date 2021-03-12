const interestedClientsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INTERESTED_CLIENTS':
        return action.payload;
      default:
        return state;
    }
  };

  // user will be on the redux state at:
  // state.user
  export default interestedClientsReducer;