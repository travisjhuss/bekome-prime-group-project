

import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* exploreSaga() {

    yield takeEvery('GET_PROVIDERS', getProviders);

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


export default exploreSaga;