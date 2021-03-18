import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

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
    console.log('fetchProviderQuestions response.data', response.data);
    // save in preferences reducer
    yield put({ type: 'SET_PROVIDER_QUESTIONS', payload: response.data });
  } catch (err) {
    console.log('error in fetchProviderQuestions:', err);
  }
}

function* addNewQuestion(action) {
  try {
    console.log('in saga new question', action.payload)
    yield axios.post('/api/forms/add_question', {content: action.payload});
    // fetch provider questions so the admin form updates
    yield put({ type: 'FETCH_PROVIDER_QUESTIONS' })
  } catch (err) {
    console.log('error in addNewQuestion', err)
  }
}

function* deleteQuestion(action) {
  try {
    console.log('in saga delete question', action.payload)
    yield axios.delete(`/api/forms/delete_question/${action.payload}`)

    // fetch provider questions so the admin form updates
    yield put({ type: 'FETCH_PROVIDER_QUESTIONS' })
  } catch (err) {
    console.log('error in deleteQuestion', err)
  }
}

function* editQuestion(action) {
  try {
    console.log('in editQuestion with payload: ', action.payload);
    yield axios.put('/api/forms/edit_question', action.payload);

    yield put({type: 'FETCH_PROVIDER_QUESTIONS'});
  } catch(err) {
    console.log('error in editQuestion', err)
  }
}

function* addNewClient(action) {
  try {
    console.log('in addNewClient with payload:', action.payload);
    yield axios.post('/api/forms/add_client', action.payload);
    // fetch user so nav bar updates
    yield put({type: 'FETCH_USER'});
  } catch (err) {
    console.log('error in addNewClient:', err);
  }
}

function* addNewProvider(action) {
  try {
      console.log('in addNewProvider with payload:', action.payload);
      yield axios.post('/api/forms/add_provider', action.payload);
      // fetch user so nav bar updates
      yield put({type: 'FETCH_USER'});
  } catch (err) {
    console.log('error in addNewProvider:', err);
  }
}

function* addNewPreference(action) {
  try {
    console.log('in addNewPreference with payload:', action.payload);
    yield axios.post('/api/forms/add_preference', action.payload);
    // fetch preferences so admin panel updates
    yield put({type: 'FETCH_PREFERENCES'});
  } catch (err) {
    console.log('error in addNewPreference', err);
  }
}

function* deletePreference(action) {
  const id = action.payload
  try {
    console.log('in deletePreference with payload:', action.payload);
    yield axios.delete(`/api/forms/delete_preference/${id}`);
    // fetch preferences so admin panel updates
    yield put({type: 'FETCH_PREFERENCES'});
  } catch (err) {
    console.log('error in deletePreference', err);
  }
}

function* editPreference(action) {
  try {
    console.log('in editPreference with payload: ', action.payload);
    yield axios.put('/api/forms/edit_preference', action.payload);

    yield put({type: 'FETCH_PREFERENCES'});
  } catch(err) {
    console.log('error in editPreference', err)
  }
}

function* fetchUsers() {
  try {
    const response = yield axios.get('/api/forms/fetch_users')
    console.log('in fetchUsers with response data: ', response.data)
    yield put({ type: 'SET_USERS', payload: response.data })
  } catch (error) {
    console.log('error in fetchUsers', error)
  }
}

export default formsSaga;
