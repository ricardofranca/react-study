import * as types from './types';

export function addErrorMessage(message) {
    return { type: types.ADD_ERROR_MESSAGE, payload: message };
}

export function clearErrorMessage(message) {
    return { type: types.CLEAR_ERROR_MESSAGE, payload: message };
}

export function succesLogin(login, token) {
    return { type: types.LOGIN_SUCCESS, payload: { login, token } };
}

export function logout(login, token) {
    return { type: types.LOGOUT };
}

// export function clearErrorMessage(message) {
//     return { type: types.CLEAR_ERROR_MESSAGE, payload: message };
// }