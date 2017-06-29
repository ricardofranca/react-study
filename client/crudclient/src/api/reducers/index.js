import { messagesReducer } from './messages';
import { registerReducer } from './register';
import { clientsReducer } from './clients';
import { auth } from './auth';

export const reducers = {
    messages: messagesReducer,
    register: registerReducer,
    auth,
    clients: clientsReducer
};