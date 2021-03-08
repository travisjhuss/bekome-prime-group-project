import { combineReducers } from 'redux';

//
const preferences = (state = [], action) => {
  switch (action.type) {
    case 'SET_PREFERENCES':
      return action.payload;
    default:
      return state;
  }
};

const providerQuestions = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROVIDER_QUESTIONS':
        return action.payload;
      default:
        return state;
    }
  };

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const clientAnswers = (state = {}, action) => {
  switch (action.type) {
    case '':
      return '';
    default:
      return state;
  }
};

const providerAnswers = (state = {}, action) => {
    switch (action.type) {
      case '':
        return '';
      default:
        return state;
    }
  };

// these will be on the redux state at:
// state.forms.preferences & state.forms.clientAnswers & state.forms.providerAnswers
export default combineReducers({
  preferences,
  providerQuestions,
  clientAnswers,
  providerAnswers
});