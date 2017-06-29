import { getHeadersWithToken } from '../../helpers';
import { constants } from '../../constants';

export default class ClientService {
    static fetch({ token }) {
        const headers = getHeadersWithToken(token);

        return fetch(`${constants.urlBase}/Clients`, { method: 'GET', headers })
            .then(response => response.json());
    }

    static save({ payload, token }) {
        const headers = getHeadersWithToken(token);

        const body = {
            "Name": payload.name,
            "DateOfBirth": payload.dateOfBirth
        };

        return fetch(`${constants.urlBase}/Clients`, { method: 'POST', headers, body: JSON.stringify(body) })
            .then(response => response.json());
    }

    static remove({ clientId, token }) {
        const headers = getHeadersWithToken(token);

        return fetch(`${constants.urlBase}/Clients/${clientId}`, { method: 'DELETE', headers })
            .then(response => response.json());
    }

    static get({ clientId, token }) {
        return fetch(`${constants.urlBase}/Clients/${clientId}`, ClientService._createRequestInfo({ method: 'GET', token }))
            .then(response => response.json());
    }

    static update({ clientId, name, dateOfBirth, token }) {
        const body = {
            Id: clientId,
            Name: name, 
            DateOfBirth: dateOfBirth
        };

        return fetch(`${constants.urlBase}/Clients/${clientId}`, ClientService._createRequestInfo({ method: 'PUT', token, body }));
    }

    static _createRequestInfo({ method, body, token }) {
        let requestInfo = {
            method: method,
            headers: getHeadersWithToken(token),
        };

        if (body) {
            requestInfo.body = JSON.stringify(body);
        }

        return requestInfo;
    }
}