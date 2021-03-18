import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* interestedClientsSaga() {

    yield takeEvery('FETCH_INTERESTED_CLIENTS', getInterestedClients);

}


function* getInterestedClients(action) {

        // payload that came from dispatch in interestedClients.jsx 
        const id = action.payload.id
    try {

        // saga calls GET route to for interested clients
        const response = yield axios.get(`/api/interested-clients`);
        console.log('getInterestedClients response.data', response.data);
        // save in explore reducer
        yield put({ type: 'SET_INTERESTED_CLIENTS', payload: response.data });
    } catch (err) {
        console.log('error in interestedClients saga:', err);
    }

}

export default interestedClientsSaga;