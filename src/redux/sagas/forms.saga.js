import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* formsSaga() {
  yield takeEvery('FETCH_PREFERENCES', fetchPreferences);
  yield takeEvery('FETCH_PROVIDER_QUESTIONS', fetchProviderQuestions);
  yield takeEvery('ADD_NEW_CLIENT', addNewClient);
}

function* fetchPreferences() {
  try {
    // GET all preferences from DB to populate forms
    const response = yield axios.get('/api/forms/preferences');
    console.log('fetchPreferences response.data', response.data);
    // save in preferences reducer
    yield put({ type: 'SET_PREFERENCES', payload: response.data });
  } catch (err) {
    console.log('error in fetchPreferences:', err);
  }
}

function* fetchProviderQuestions() {
  try {
    // GET all preferences from DB to populate forms
    const response = yield axios.get('/api/forms/provider_questions');
    console.log('fetchProviderQuestions response.data', response.data);
    // save in preferences reducer
    yield put({ type: 'SET_PROVIDER_QUESTIONS', payload: response.data });
  } catch (err) {
    console.log('error in fetchProviderQuestions:', err);
  }
}

function* addNewClient(action) {
  try {
    console.log('in addNewClient with payload:', action.payload);
    yield axios.post('/api/forms/add_client', action.payload);
  } catch (err) {
    console.log('error in addNewClient:', err);
  }
}

export default formsSaga;
