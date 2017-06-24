import { Client } from '../actions/types';

const initialState = {
    list: [],
    edit: {

    },
    errorMessage: ''
};

export function clientsReducer(state = initialState, action) {

    if (action.type === Client.fetchSuccess) {
        return { ...state, list: action.payload };
    }

    if (action.type === Client.fetchFailure) {
        return { ...state, errorMessage: action.payload };
    }

    return state;
}