import * as config from "../config";

export const getAuth = () => {
    const userId = getCookie("SQUADOPS_USER_ID");
    const accessToken = getCookie("SQUADOPS_ACCESS_TOKEN");
    return {
        userId,
        accessToken
    }
};

export const goToLogin = () => {
    // document.location.href = (document.location.href.indexOf("localhost") === -1) ? "http://beta.awn.gg/login?redirect=https://ap.beta.awn.gg/" : "http://awn.localhost/login?redirect=http://ap.awn.localhost/";
};

export const clearAuth = () => {
    // document.location.href = (document.location.href.indexOf("localhost") === -1) ? "http://beta.awn.gg/logout" : "http://awn.localhost/logout";
};

export const getURLOrgId = () => {
    const parts = document.location.href.split("/");
    if (parts.length < 5) {
        console.warn("Could not get org id from url. Parts less than 5.");
        return null;
    }
    const orgId = parts[4];

    if (orgId == null || orgId === "") {
        return null;
    }

    if (orgId === "organizations") {
        return null;
    }

    return orgId;
};

const getCookie = (name) => {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [k,v] = el.split('=');
        cookie[k.trim()] = v;
    });
    return cookie[name];
};
