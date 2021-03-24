import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// These sagas handle the forms as well as admin currently
// the admin sagas should go in their own file but we ran out of time

function* formsSaga() {
  yield takeEvery('FETCH_PREFERENCES', fetchPreferences);
  yield takeEvery('ADD_NEW_PREFERENCE', addNewPreference);
  yield takeEvery('DELETE_PREFERENCE', deletePreference);
  yield takeEvery('EDIT_PREFERENCE', editPreference);
  yield takeEvery('FETCH_PROVIDER_QUESTIONS', fetchProviderQuestions);
  yield takeEvery('ADD_NEW_QUESTION', addNewQuestion);
  yield takeEvery('DELETE_QUESTION', deleteQuestion);
  yield takeEvery('EDIT_QUESTION', editQuestion);
  yield takeEvery('ADD_NEW_CLIENT', addNewClient);
  yield takeEvery('ADD_NEW_PROVIDER', addNewProvider);
  yield takeEvery('FETCH_USERS', fetchUsers);
}

function* fetchPreferences() {
  try {
    // GET all preferences from DB to populate forms
    const response = yield axios.get('/api/forms/preferences');
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
    // save in preferences reducer
    yield put({ type: 'SET_PROVIDER_QUESTIONS', payload: response.data });
  } catch (err) {
    console.log('error in fetchProviderQuestions:', err);
  }
}

function* addNewQuestion(action) {
  try {
    // adds question to provider form
    yield axios.post('/api/forms/add_question', { content: action.payload });
    // fetch provider questions so the admin form updates
    yield put({ type: 'FETCH_PROVIDER_QUESTIONS' });
  } catch (err) {
    console.log('error in addNewQuestion', err);
  }
}

//
function* deleteQuestion(action) {
  try {
    // deletes question from provider form
    yield axios.delete(`/api/forms/delete_question/${action.payload}`);
    // fetch provider questions so the admin form updates
    yield put({ type: 'FETCH_PROVIDER_QUESTIONS' });
  } catch (err) {
    console.log('error in deleteQuestion', err);
  }
}

function* editQuestion(action) {
  try {
    // will edit question from provider form
    yield axios.put('/api/forms/edit_question', action.payload);
    yield put({ type: 'FETCH_PROVIDER_QUESTIONS' });
  } catch (err) {
    console.log('error in editQuestion', err);
  }
}

function* addNewClient(action) {
  try {
    // adds new client to db
    yield axios.post('/api/forms/add_client', action.payload);
    // fetch user so nav bar updates
    yield put({ type: 'FETCH_USER' });
  } catch (err) {
    console.log('error in addNewClient:', err);
  }
}

function* addNewProvider(action) {
  try {
    // adds new provider to db
    yield axios.post('/api/forms/add_provider', action.payload);
    // fetch user so nav bar updates
    yield put({ type: 'FETCH_USER' });
  } catch (err) {
    console.log('error in addNewProvider:', err);
  }
}

function* addNewPreference(action) {
  try {
    // adds new preference to db
    yield axios.post('/api/forms/add_preference', action.payload);
    // fetch preferences so admin panel updates
    yield put({ type: 'FETCH_PREFERENCES' });
  } catch (err) {
    console.log('error in addNewPreference', err);
  }
}

function* deletePreference(action) {
  const id = action.payload;
  try {
    // deletes preference from db
    yield axios.delete(`/api/forms/delete_preference/${id}`);
    // fetch preferences so admin panel updates
    yield put({ type: 'FETCH_PREFERENCES' });
  } catch (err) {
    console.log('error in deletePreference', err);
  }
}

function* editPreference(action) {
  try {
    // edit preference in db
    yield axios.put('/api/forms/edit_preference', action.payload);
    yield put({ type: 'FETCH_PREFERENCES' });
  } catch (err) {
    console.log('error in editPreference', err);
  }
}

function* fetchUsers() {
  try {
    // gets all users from db for admin panel
    const response = yield axios.get('/api/forms/fetch_users');
    // stores in reducer
    yield put({ type: 'SET_USERS', payload: response.data });
  } catch (error) {
    console.log('error in fetchUsers', error);
  }
}

export default formsSaga;
