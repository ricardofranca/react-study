import { messagesReducer } from './messages';
import { registerReducer } from './register';

export function getReducers() {
    return  { messages: messagesReducer, register: registerReducer };
}