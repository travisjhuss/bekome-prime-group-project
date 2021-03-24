const providerQuestions = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROVIDER_QUESTIONS':
        return action.payload;
      default:
        return state;
    }
  };

  //  Holds provider questions for populating form
  // can be found at store.providerQuestions
  export default providerQuestions;