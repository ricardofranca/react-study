import * as types from './types';

export function addErrorMessage(message) {
    return { type: types.ADD_ERROR_MESSAGE, payload: message };
}

export function clearErrorMessage(message) {
    return { type: types.CLEAR_ERROR_MESSAGE, payload: message };
}

// export function clearErrorMessage(message) {
//     return { type: types.CLEAR_ERROR_MESSAGE, payload: message };
// }