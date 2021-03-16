import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editProfileSaga() {
  yield takeEvery('FETCH_EDIT_CLIENT_PROFILE', fetchEditClientProfile);
  yield takeEvery('FETCH_EDIT_PROVIDER_PROFILE', fetchEditProviderProfile);
  yield takeEvery('SUBMIT_CLIENT_EDITS', submitClientEdits);
  yield takeEvery('SUBMIT_PROVIDER_EDITS', submitProviderEdits);
}

function* fetchEditClientProfile(action) {
  try {
    const id = action.payload;
    // confirm path (po's branch?)
    const response = yield axios.get(`/api/edit/client/${id}`);
    // dispatch to clientAnswers
    yield put({ type: 'SET_EDIT_CLIENT_PROFILE', payload: response.data });
  } catch (err) {
    console.log('error in fetchEditClientProfile:', err);
  }
}

function* fetchEditProviderProfile(action) {
  try {
    const id = action.payload;
    // confirm path
    const response = yield axios.get(`/api/provider-details/${id}`);
    // dispatch to providerAnswers
    yield put({ type: 'SET_EDIT_PROVIDER_PROFILE', payload: response.data });
  } catch (err) {
    console.log('error in fetchEditProviderProfile:', err);
  }
}

function* submitClientEdits() {
  try {
    yield axios.put('/api/edit/client/', action.payload);
  } catch (err) {
    console.log('error in submitClientEdits:', err);
  }
}

function* submitProviderEdits() {
  try {
    yield axios.put('/api/edit/provider/', action.payload);
  } catch (err) {
    console.log('error in submitProviderEdits:', err);
  }
}

export default editProfileSaga;
