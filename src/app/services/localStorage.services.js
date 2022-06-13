const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const EXPIRES_KEY = 'jwt-expires';
const USERLOGIN_KEY = 'user-login';

export function setTokens({
    refreshToken,
    idToken,
    expiresIn = 3600,
    userLogin
}) {
    const expiresDate = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, idToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    localStorage.setItem(EXPIRES_KEY, expiresDate);
    localStorage.setItem(USERLOGIN_KEY, userLogin);
}

export function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY);
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY);
}

export function getUserId() {
    return localStorage.getItem(USERLOGIN_KEY);
}

const localStorageService = {
    setTokens,
    getAccessToken,
    getRefreshToken,
    getTokenExpiresDate,
    getUserId
};

export default localStorageService;
