import { fork } from 'redux-saga/effects';
import { watchFetchClients, watchSaveNewClient } from './clients';

function* rootSagas() {
    yield fork(watchFetchClients);
    yield fork(watchSaveNewClient);
}

export default rootSagas;