import { isDev, COOKIE_NAME_ACCESS_TOKEN, isDemo, DEMO_ACCESS_TOKEN } from "../../config/index.js";
import {getCookie,setCookie} from "../../util/index.js";
import apiService from "../api/index.js";
import sha512 from "js-sha512";

const isLoggedIn = () => getAccessToken() !== null;

const login = async ({ email, password }) => {
    const { valid, accessToken, userId } = await apiService.v5.login({ email, password });
    console.log("login data: ", { valid, accessToken, userId });
    if (!valid) return false;
    setAccessToken(accessToken);
    setUserId(userId);
    return true;
};

const logout = async () => {
    await apiService.v5.logout();
    clearUserId();
    clearAccessToken();
};

const getAccessToken = () => {
    let token = isDemo ? DEMO_ACCESS_TOKEN : getCookie(COOKIE_NAME_ACCESS_TOKEN);
    if (token === "") {
        clearAccessToken();
        return null;
    }
    return token;
};

const setAccessToken = (token, expirationTimeSeconds = (isDev ? 30 * 60 : 5 * 365 * 24 * 60 * 60)) => {
    if (isDemo) {
        console.error("You cannot set the access token in the demo.");
        return;
    }
    return setCookie(COOKIE_NAME_ACCESS_TOKEN, token, {
        maxAge: expirationTimeSeconds,
        secure: !isDev,
        path: '/',
        domain: !isDev ? `*.${document.location.host.split('.').splice(document.location.host.split('.').length - 2).join('.')}`: null
    });
};

const clearAccessToken = () => {
    setAccessToken(null, -1);
};

const getUserId = (accessToken = getAccessToken()) => {
    if (!accessToken) return null;
    return localStorage.getItem('userId.'+sha512(accessToken));
};

const setUserId = (userId, accessToken = getAccessToken()) => {
    if (!accessToken) return;
    localStorage.setItem('userId.'+sha512(accessToken), userId);
};

const clearUserId = (accessToken = getAccessToken()) => {
    if (!accessToken) return;
    localStorage.removeItem('userId.'+sha512(accessToken));
};

const authService = Object.freeze({
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    getUserId,
    setUserId,
    login,
    logout,
    isLoggedIn
});

export default authService;
export {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    getUserId,
    setUserId,
    login,
    logout,
    isLoggedIn
}
