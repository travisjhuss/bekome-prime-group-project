const interestedClientsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_INTERESTED_CLIENTS':
        return action.payload;
      default:
        return state;
    }
  };

  // used on interestedClients.jsx, stores clients that have saved logged in provider
  // reducer can be found at store.interestedClientsReducer
  export default interestedClientsReducer;