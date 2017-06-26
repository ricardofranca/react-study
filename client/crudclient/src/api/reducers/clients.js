import { Client } from '../actions/types';

const initialState = {
    list: [],
    edit: {
        name: '',
        dateOfBirth: ''
    },
    errorMessage: '',
    successMessage: ''
};

export function clientsReducer(state = initialState, action) {

    switch (action.type) {
        case Client.fetchSuccess:
            return { ...state, list: action.payload };
        case Client.fetchFailure:
            return { ...state, errorMessage: action.payload };
        case Client.updateForm:
            let { edit } = state;
            console.log('edit: ', action.payload);
            edit[action.payload.field] = action.payload.fieldValue;
            return { ...state, edit };
        case Client.saveNewSuccess:
            return { ...state, edit: { name: '', dateOfBirth: '' }, successMessage: 'The client have been saved' };
        default:
            return state;
    }
}