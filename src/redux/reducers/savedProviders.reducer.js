const savedProvidersReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SAVED_PROVIDERS':
      return action.payload;
    default:
      return state;
  }
};

// used in savedProviders.jsx and holds saved providers for a client
// can be found at store.savedProviders
export default savedProvidersReducer;
