import { fork } from 'redux-saga/effects';
import { watchFetchClients } from './clients';

function* rootSagas() {
    yield fork(watchFetchClients);
}

export default rootSagas;