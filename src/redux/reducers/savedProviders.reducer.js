const savedProvidersReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SAVED_PROVIDERS':
        return action.payload;
      default:
        return state;
    }
  };

  export default savedProvidersReducer;