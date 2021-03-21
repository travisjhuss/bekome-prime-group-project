import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchMessages() {
  try {
    const response = yield axios.get('/api/messaging');
    yield put({ type: 'SET_MESSAGES', payload: response.data });
  } catch (err) {
    console.log('Error in fetchMessages', err);
  }
}

function* markAsRead(action) {
  try {
    yield axios.put('/api/messaging', action.payload);
    yield put({ type: 'FETCH_MESSAGES' });
  } catch (err) {
    console.log('Error in markAsRead', err);
  }
}

export default function* messagingSaga() {
  yield takeEvery('FETCH_MESSAGES', fetchMessages);
  yield takeEvery('MARK_AS_READ', markAsRead);
}
