const oneClient = (state = {}, action) => {
  switch (action.type) {
    case 'SET_ONE_CLIENT':
      return action.payload;
    default:
      return state;
  }
};

export default oneClient;
