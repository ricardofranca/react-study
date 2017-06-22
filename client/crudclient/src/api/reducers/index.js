import { messagesReducer } from './messages';
import { registerReducer } from './register';
import { auth } from './auth';

export function getReducers() {
    return  { messages: messagesReducer, register: registerReducer, auth };
}