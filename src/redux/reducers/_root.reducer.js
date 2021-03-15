import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import forms from './forms.reducer';
import providerQuestions from './providerQuestions.reducer';
import preferences from './preferences.reducer';
import exploreReducer from './explore.reducer';
import providerDetails from './providerDetails.reducer';
<<<<<<< HEAD
import interestedClientsReducer from './interestedClients.reducer';
=======
import savedProviders from './savedProviders.reducer';
>>>>>>> 5d0795f26cf38af2b72ea636a467af8c3ed32b90

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
  exploreReducer, // reducer that contains all explore provider data
  providerDetails, // Returns info for one provider for ProviderDetails
<<<<<<< HEAD
  interestedClientsReducer, // This reducer holds the picture and select preference result returned from the interested-clients router
=======
  savedProviders, // contains provider data for SavedProviders view
>>>>>>> 5d0795f26cf38af2b72ea636a467af8c3ed32b90
});

export default rootReducer;
