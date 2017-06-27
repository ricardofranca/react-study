import { fork } from 'redux-saga/effects';
import { watchFetchClients, watchSaveNewClient, watchremoveClient } from './clients';

function* rootSagas() {
    yield fork(watchFetchClients);
    yield fork(watchSaveNewClient);
    yield fork(watchremoveClient);
}

export default rootSagas;