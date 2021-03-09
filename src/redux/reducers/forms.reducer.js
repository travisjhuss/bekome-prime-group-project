import { combineReducers } from 'redux';

// Holds clients answers as they step through form
const clientAnswers = (
  state = {
    first_name: '',
    last_name: '',
    pic: '',
    date_of_birth: '',
    pronouns: '',
    sexual_orientation: '',
    location: '',
    primary_reason: '',
    previous_therapy: false,
    previous_experience: '',
    preferences: [],
  },
  action
) => {
  switch (action.type) {
    case 'SET_CLIENT_PERSONAL_DETAILS':
      return { ...state, [action.payload.key]: action.payload.value };
    case 'SET_CLIENT_PREFERENCES':
      const preferenceId = action.payload;
      if (state.preferences.indexOf(preferenceId) === -1) {
        return {
          ...state,
          preferences: [...state.preferences, preferenceId],
        };
      } else {
        return {
          ...state,
          preferences: state.preferences.filter(
            (index) => index !== preferenceId
          ),
        };
      }
    default:
      return state;
  }
};

// Holds providers answers as they step through form
const providerAnswers = (state = {}, action) => {
  switch (action.type) {
    case '':
      return '';
    default:
      return state;
  }
};

// these will be on the redux state at:
// state.forms.clientAnswers & state.forms.providerAnswers
export default combineReducers({
  clientAnswers,
  providerAnswers,
});
