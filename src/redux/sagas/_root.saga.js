import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import formsSaga from './forms.saga';
import exploreSaga from './explore.saga';
import providerDetailsSaga from './providerDetails.saga';
<<<<<<< HEAD
import interestedClientsSaga from './interestedClients.saga'
=======
import savedProvidersSaga from './savedProviders.saga';
>>>>>>> 5d0795f26cf38af2b72ea636a467af8c3ed32b90

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
<<<<<<< HEAD
    interestedClientsSaga(), // saga that calls api router to GET interested client using provider's user id
=======
    savedProvidersSaga(), // GETS provider data for SavedProviders view
>>>>>>> 5d0795f26cf38af2b72ea636a467af8c3ed32b90
  ]);
}
