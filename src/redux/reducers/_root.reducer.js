import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import forms from './forms.reducer';
import providerQuestions from './providerQuestions.reducer';
import preferences from './preferences.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  forms, // contains reducers for holding answers while filling out forms
  providerQuestions, // reducer for getting the questions from the db
  preferences, // reducer for getting all preferences options from db
});

export default rootReducer;
