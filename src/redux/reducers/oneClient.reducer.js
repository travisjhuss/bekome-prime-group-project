const oneClient = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ONE_CLIENT':
      return action.payload;
    default:
      return state;
  }
};

// stores client details for editing
// found at store.oneClient
export default oneClient;
