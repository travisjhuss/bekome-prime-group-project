import { combineReducers } from 'redux';

// Holds clients answers as they step through form
const clientAnswers = (
  state = {
    first_name: '',
    last_name: '',
    pic: '',
    date_of_birth: '',
    write_in_pronouns: '',
    location: '',
    primary_reason: '',
    previous_therapy: false,
    previous_experience: '',
    insurance: false,
    sliding_scale: false,
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
    case 'SET_INSURANCE_SLIDING_SCALE':
      return { ...state, [action.payload]: !state[action.payload] };
    case 'CLEAR_CLIENT_ANSWERS':
      return {};
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
