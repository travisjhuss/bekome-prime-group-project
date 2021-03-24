const exploreReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_EXPLORE':
        return action.payload;
      default:
        return state;
    }
  };

  // used on exploreProviders.jsx, stores providers
  // reducer can be found at store.exploreReducer
  export default exploreReducer;