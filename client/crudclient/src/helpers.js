export function getHeadersWithToken(token) {

    return {
        'Content-Type': 'application/json',
        'Authorization': `bearer ${token}`
    };
}