import { fork } from 'redux-saga/effects';
import { watchFetchClients, watchSaveNewClient, watchremoveClient, watchGetClient, watchUpdateClient } from './clients';

function* rootSagas() {
    yield fork(watchFetchClients);
    yield fork(watchSaveNewClient);
    yield fork(watchremoveClient);
    yield fork(watchGetClient);
    yield fork(watchUpdateClient);
}

export default rootSagas;