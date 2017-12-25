let Token = null;

export function authToken() {
    const storage = window.localStorage;
    Token = storage.getItem('session_auth');
    return Token;
}