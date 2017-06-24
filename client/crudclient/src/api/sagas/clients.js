import { takeLatest } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';
import { Client as ClientTypes } from '../actions/types';
import { constants } from '../../constants';
import { getHeadersWithToken } from '../../helpers';

function fetchClientCall({ token }) {
    const headers = getHeadersWithToken(token);

    return fetch(`${constants.urlBase}/Clients`, { method: 'GET', headers })
        .then(response => response.json());
}

function* fetchClient(action) {
    const { payload } = action;

    try {
        // console.log('saga => fetch');
        const { auth } = yield select();
        const token = auth.token;
        const payload = yield call(fetchClientCall, { token });
        yield put({ type: ClientTypes.fetchSuccess, payload });
    } catch (err) {
        console.error('saga error', err.message);
        yield put({ type: ClientTypes.fetchFailure, payload });
    }

}

// function* find(action) {
//     //retrive the client by ClientId
// }

// function* add(action) {

// }

// function* remove(action) {

// }

// function* edit(action) {

// }

export function* watchFetchClients() {
    //assigning the watcher
    yield takeLatest(ClientTypes.fetchCall, fetchClient);
}