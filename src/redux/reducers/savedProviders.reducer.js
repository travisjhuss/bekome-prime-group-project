const savedProvidersReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SAVED_PROVIDERS':
        //   console.log('in reducer', action.payload)
        return action.payload;
      default:
        return state;
    }
  };

  export default savedProvidersReducer;