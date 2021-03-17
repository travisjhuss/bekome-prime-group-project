import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import forms from './forms.reducer';
import providerQuestions from './providerQuestions.reducer';
import preferences from './preferences.reducer';
import exploreReducer from './explore.reducer';
import providerDetails from './providerDetails.reducer';
import interestedClientsReducer from './interestedClients.reducer';
import savedProviders from './savedProviders.reducer';
import oneClient from './oneClient.reducer';

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
  interestedClientsReducer, // This reducer holds the picture and select preference result returned from the interested-clients router
  savedProviders, // This reducer hold the providers that the client has saved as a favorite
  oneClient, // Holds card info for a logged in client in EditClient, so the card doesn't have active changes during typing
});

export default rootReducer;
