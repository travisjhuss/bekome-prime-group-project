import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import formsSaga from './forms.saga';
import exploreSaga from './explore.saga';
import providerDetailsSaga from './providerDetails.saga';
import interestedClientsSaga from './interestedClients.saga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    formsSaga(), // handles all dispatches regarding forms
    exploreSaga(), // GETS provider data for ExploreView
    providerDetailsSaga(), // Handles all dispatches regarding individual providers
    interestedClientsSaga(), // saga that calls api router to GET interested client using provider's user id
  ]);
}
