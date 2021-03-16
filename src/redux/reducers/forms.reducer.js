import { combineReducers } from 'redux';

// Holds clients answers as they step through form
export const clientAnswers = (
  state = {
    first_name: '',
    last_name: '',
    pic: '',
    date_of_birth: '',
    write_in_pronouns: '',
    city: '',
    state: '',
    primary_reason: '',
    previous_therapy: false,
    previous_experience: '',
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
    case 'CLEAR_CLIENT_ANSWERS':
      return {};
    case 'SET_EDIT_CLIENT_PROFILE':
      return action.payload;
    default:
      return state;
  }
};

// Holds providers answers as they step through form
export const providerAnswers = (
  state = {
    first_name: '',
    last_name: '',
    pic: '',
    video: '',
    city: '',
    state: '',
    date_of_birth: '',
    write_in_pronouns: '',
    background: '',
    strengths: '',
    approach: '',
    sliding_scale: false,
    accepting_clients: false,
    license_number: '',
    questions: [],
    preferences: [],
  },
  action
) => {
  switch (action.type) {
    case 'SET_PROVIDER_PERSONAL_DETAILS':
      return { ...state, [action.payload.key]: action.payload.value };
    case 'SET_PROVIDER_PREFERENCES':
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
    case 'SET_PROVIDER_RESPONSES':
      const { id, answer } = action.payload;
      const foundIndex = state.questions.findIndex(
        (item) => item.question_id === id
      );
      if (foundIndex > -1) {
        const newQuestionsArray = [...state.questions];
        newQuestionsArray[foundIndex] = {
          ...newQuestionsArray[foundIndex],
          answer,
        };
        return { ...state, questions: newQuestionsArray };
      } else {
        return {
          ...state,
          questions: [...state.questions, { question_id: id, answer }],
        };
      }
    case 'CLEAR_PROVIDER_ANSWERS':
      return {};
    case 'SET_EDIT_PROVIDER_PROFILE':
      return action.payload;
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
