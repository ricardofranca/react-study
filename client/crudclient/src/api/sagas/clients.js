import { takeLatest } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';
import { Client as ClientTypes } from '../actions/types';
import { constants } from '../../constants';
import { getHeadersWithToken } from '../../helpers';
import { push } from 'react-router-redux';

function fetchClientAjax({ token }) {
    const headers = getHeadersWithToken(token);

    return fetch(`${constants.urlBase}/Clients`, { method: 'GET', headers })
        .then(response => response.json());
}

function saveNewAjax({ payload, token }) {
    const headers = getHeadersWithToken(token);

    const body = {
        "Name": payload.name,
        "DateOfBirth": payload.dateOfBirth
    };

    return fetch(`${constants.urlBase}/Clients`, { method: 'POST', headers, body: JSON.stringify(body) })
        .then(response => response.json());
}

function removeAjax({ clientId, token }) {
    const headers = getHeadersWithToken(token);

    return fetch(`${constants.urlBase}/Clients/${clientId}`, { method: 'DELETE', headers })
        .then(response => response.json());
}

function* fetchClient(action) {
    try {
        const { auth } = yield select();
        const token = auth.token;
        const payload = yield call(fetchClientAjax, { token });
        yield put({ type: ClientTypes.fetchSuccess, payload });
    } catch (err) {
        console.error('saga error', err.message);
        yield put({ type: ClientTypes.fetchFailure });
    }
}

function* saveNew(action) {
    const { payload } = action;

    try {
        console.log('saving saga');

        const { auth } = yield select();
        const token = auth.token;

        yield call(saveNewAjax, { payload, token })

        yield put({ type: ClientTypes.saveNewSuccess });

        console.log('saved, redirecting');

        yield put(push('/'));

        console.log('end saga');
    } catch (err) {
        console.log('err', err.message);
        yield put({ type: ClientTypes.saveNewFailure });
    }
}

function* removeClient(action) {
    const { payload } = action;

    try {
        const { auth } = yield select();
        const token = auth.token;

        console.log('calling: ', payload.clientId);
        yield call(removeAjax, { clientId: payload.clientId, token });

        yield call(fetchClient, { payload });

        yield put({ type: ClientTypes.removeClientSuccess });
    } catch (err) {
        yield put({ type: ClientTypes.removeClientFailure });
    }

}

// function* edit(action) {

// }

export function* watchFetchClients() {
    yield takeLatest(ClientTypes.fetchCall, fetchClient);
}

export function* watchSaveNewClient() {
    yield takeLatest(ClientTypes.saveNew, saveNew);
}

export function* watchremoveClient() {
    yield takeLatest(ClientTypes.removeClient, removeClient);
}