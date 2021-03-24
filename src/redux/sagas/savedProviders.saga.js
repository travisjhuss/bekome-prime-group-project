import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// This saga handles a dispatch to retrieve all of a clients user's saved providers. 

function* savedProvidersSaga() {
  yield takeEvery('GET_SAVED_PROVIDERS', getSavedProviders);
}

function* getSavedProviders() {
  try {
    // GET providers
    const response = yield axios.get('/api/saved-providers');
    // save in explore reducer
    yield put({ type: 'SET_SAVED_PROVIDERS', payload: response.data });
  } catch (err) {
    console.log('error in getSavedProviders Saga', err);
  }
}

export default savedProvidersSaga;
