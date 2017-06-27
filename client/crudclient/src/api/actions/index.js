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

export function fetchClient() {
    return { type: types.Client.fetchCall };
}

export function updateClientForm(field, fieldValue) {
    return { type: types.Client.updateForm, payload: { field, fieldValue } };
}

export function saveClient(name, dateOfBirth) {
    return { type: types.Client.saveNew, payload: { name, dateOfBirth } };
}

export function removeClient(clientId) {
    return { type: types.Client.removeClient, payload: { clientId } };
}

// export function clearErrorMessage(message) {
//     return { type: types.CLEAR_ERROR_MESSAGE, payload: message };
// }