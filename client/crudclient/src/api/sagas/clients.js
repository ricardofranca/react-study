import { takeLatest } from 'redux-saga/effects';
import { call, put, select } from 'redux-saga/effects';
import { Client as ClientTypes } from '../actions/types';
import { push } from 'react-router-redux';
import ClientService from '../services/clients';
import * as actions from '../actions';
import moment from 'moment';

function* fetchClient(action) {
    try {
        const { auth } = yield select();
        const token = auth.token;
        const payload = yield call(ClientService.fetch, { token });
        yield put({ type: ClientTypes.fetchSuccess, payload });
    } catch (err) {
        console.error('saga error', err.message);
        yield put({ type: ClientTypes.fetchFailure });
    }
}

function* saveNew(action) {
    const { payload } = action;

    try {
        const { auth } = yield select();
        const token = auth.token;

        yield call(ClientService.save, { payload, token })

        yield put({ type: ClientTypes.saveNewSuccess });

        yield put(push('/clients'));
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
        yield call(ClientService.remove, { clientId: payload.clientId, token });
        yield call(fetchClient, { payload });
        yield put({ type: ClientTypes.removeClientSuccess });
    } catch (err) {
        yield put({ type: ClientTypes.removeClientFailure });
    }
}

function* getClient(action) {
    try {
        const { auth } = yield select();
        const { clientId } = action.payload;
        const client = yield call(ClientService.get, { clientId, token: auth.token });
        yield put(actions.updateClientForm('id', client.Id));
        yield put(actions.updateClientForm('name', client.Name));
        yield put(actions.updateClientForm('dateOfBirth', moment(client.DateOfBirth)));
    } catch (err) {
        yield put({ type: ClientTypes.getClientFailure, payload: { error: err } })
    }
}

function* updateClient(action) {
    try {
        const { auth } = yield select();
        const { clientId, name, dateOfBirth } = action.payload;

        const requestPayload = {
            clientId,
            name,
            dateOfBirth,
            token: auth.token
        };

        yield call(ClientService.update, requestPayload);
        // yield put({ type: ClientTypes.updateSuccess });
        yield put(push('/clients'));
        console.log('end of saga');
    } catch (err) {
        console.error(err);
        yield put({ type: ClientTypes.updateFailure, payload: { error: err } });
    }
}

export function* watchFetchClients() {
    yield takeLatest(ClientTypes.fetchCall, fetchClient);
}

export function* watchSaveNewClient() {
    yield takeLatest(ClientTypes.saveNew, saveNew);
}

export function* watchremoveClient() {
    yield takeLatest(ClientTypes.removeClient, removeClient);
}

export function* watchGetClient() {
    yield takeLatest(ClientTypes.getClient, getClient);
}

export function* watchUpdateClient() {
    yield takeLatest(ClientTypes.update, updateClient);
}