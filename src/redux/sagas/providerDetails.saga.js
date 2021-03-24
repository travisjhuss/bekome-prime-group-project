import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

// saga that gets the providers full details upon viewing their profile page

function* fetchProviderDetails(action) {
  const id = action.payload;
  const response = yield axios.get(`/api/provider-details/${id}`);
  // puts details in a reducer
  yield put({ type: 'SET_PROVIDER_DETAILS', payload: response.data });
}

function* providerDetailsSaga() {
  yield takeEvery('FETCH_PROVIDER_DETAILS', fetchProviderDetails);
}

export default providerDetailsSaga;
