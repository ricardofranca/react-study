import { LOGIN_SUCCESS } from '../actions/types';

let initialState = {
    login: '',
    token: ''
}

const authFirstState = localStorage.getItem('auth-state');

if (authFirstState !== undefined) {
    initialState = JSON.parse(authFirstState);
}

export function auth(state = initialState, action) {
    console.log('calling auth: ', initialState);

    if (action.type === LOGIN_SUCCESS) {
        console.log('action: ', action);

        const data = { login: action.payload.login, token: action.payload.token };
        localStorage.setItem('auth-state', JSON.stringify(data));
        
        return data;
    }

    return state;
}