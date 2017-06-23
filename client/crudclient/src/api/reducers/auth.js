import { LOGIN_SUCCESS, IS_AUTHENTICATED } from '../actions/types';

let initialState = {
    login: '',
    token: ''
}

let authFirstState = localStorage.getItem('auth-state');

if (authFirstState !== undefined) {
    initialState = JSON.parse(authFirstState);
}

export function auth(state = initialState, action) {
    if (action.type === LOGIN_SUCCESS) {
        console.log('action: ', action);

        const data = { login: action.payload.login, token: action.payload.token };
        localStorage.setItem('auth-state', JSON.stringify(data));
        initialState = data;
        
        return data;
    }

    if (action.type === IS_AUTHENTICATED) {
        return initialState !== null && initialState.login !== '' ? true : false;
    }

    return state;
}