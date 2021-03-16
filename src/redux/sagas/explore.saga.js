import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* exploreSaga() {
  yield takeEvery('GET_PROVIDERS', getProviders);
  yield takeEvery('FAVORITE_PROVIDER', favoriteProvider);
  yield takeEvery('UNFAVORITE_PROVIDER', unfavoriteProvider);
}

function* getProviders() {
  try {
    // GET providers
    const response = yield axios.get('/api/explore');
    console.log('getProviders response.data', response.data);
    // save in explore reducer
    yield put({ type: 'SET_EXPLORE', payload: response.data });
  } catch (err) {
    console.log('error in getProviders:', err);
  }
}

function* favoriteProvider(action) {
  const { id, type } = action.payload;
  // Send ID of provider to server to add to 'clients_providers_favs'
  try {
    yield axios.post('/api/favorite', { id });
    yield put({ type, payload: id });
  } catch (err) {
    console.log('error in favoriteProvider', err);
  }
}

function* unfavoriteProvider(action) {
  const { id, type } = action.payload;
  // Send ID of provider to server to delete entry in 'clients_providers_favs'
  try {
    yield axios.delete(`/api/favorite/${id}`);
    yield put({ type, payload: id });
  } catch (err) {
    console.log('error in unfavoriteProvider', err);
  }
}

export default exploreSaga;
