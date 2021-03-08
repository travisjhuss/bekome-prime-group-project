//  Holds provider questions for populating form
const providerQuestions = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROVIDER_QUESTIONS':
        return action.payload;
      default:
        return state;
    }
  };

  export default providerQuestions;