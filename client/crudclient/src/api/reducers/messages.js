import { ADD_ERROR_MESSAGE, CLEAR_ERROR_MESSAGE } from '../actions/types';

const initialstate = {
    errorMessage: ''
}

export function messagesReducer(state = initialstate, action) {

    if (action.type === ADD_ERROR_MESSAGE) {
        return { ...state, errorMessage: action.payload };
    }

    if (action.type === CLEAR_ERROR_MESSAGE) {
        return { ...state, errorMessage: '' };
    }

    return state;
}