

import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* exploreSaga() {

    yield takeEvery('GET_PROVIDERS', getProviders);
    yield takeEvery('FAVORITE_PROVIDER', favoriteProvider)
    yield takeEvery('UNFAVORITE_PROVIDER', unfavoriteProvider)

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
    const payload = {providerID: action.payload}
    try {
        const response = yield axios.post('/api/favorite', payload);
        console.log('response from favoriting provider', response)
    } catch (err) {
        console.log('error in favoriteProvider', err)
    }
}

function* unfavoriteProvider(action) {
    const payload = action.payload
    try {
        yield axios.delete('/api/favorite', {data: {id: payload}});
    } catch (err) {
        console.log('error in unfavoriteProvider', err)
    }
}

export default exploreSaga;