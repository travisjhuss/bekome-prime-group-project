import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* exploreSaga() {

    yield takeEvery('GET_SAVED_PROVIDERS', getProviders);

}

function* getProviders() {
    console.log('in saga')
}

export default exploreSaga;