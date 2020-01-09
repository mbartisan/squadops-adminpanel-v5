import axios from 'axios'
import { API_HOST, API_VERSION } from "../config";
import { getAuth, getURLOrgId } from "./AuthService";

export const getBaseURL = () => `${API_HOST}/${API_VERSION}`;

/*
 If an api call to a header+endpoint combo was recent, return a cached response
 */
const cacheData = [];

const setCacheData = (key, value, expires = ((Date.now() + 30 * 1000))) => {
    cacheData.push({
        key,
        value,
        expires
    })
};

const getCacheData = (key) => {
    const now = Date.now();
    let cachedData = null;
    for (let i = cacheData.length - 1; i >= 0; i--) {
        const cached = cacheData[i];
        if (cached.expires < now) {
            console.log(cached.expires + " | Clearing cached due to expiration date.");
            cacheData.splice(i, 1);
        }
        if (key !== cached.key) continue;
        if (cachedData == null) cachedData = cached.value; // we don't immediately return so we can flush all the expired values
    }
    return cachedData;
};

// const getCachedResponseKey = (req) => {
//     let key = `[${req.method}]|`;
//     if (req.headers) key += JSON.stringify(req.headers);
//     key += "|" + req.url;
//     return key;
// };


const getAuthHeader = () => {
    const {userId, accessToken} = getAuth();
    const orgId = getURLOrgId();
    console.log("Auth header is: ", { userId, accessToken, orgId });
    return {
        "X-SQUADOPS-ACCESS-TOKEN": accessToken,
        "X-SQUADOPS-USER-ID": userId,
        "X-SQUADOPS-ORG-ID": orgId
    }
};

export const request = (url, data, req = {}) => {
    return new Promise( (resolve, reject) => {
        if (url.charAt(0) !== "/") url = "/" + url;
        const defaultMethod = (data == null) ? "GET" : "POST";
        req.headers = Object.assign({}, getAuthHeader(), req.headers || {});
        req = Object.assign({}, {
            method: defaultMethod,
            url:  getBaseURL() + url,
            data: data,
            params: null
        }, req);

        if (req.method === "GET") {
            const data = getCacheData(req.url);
            if (data) {
                console.log(req.url + " | Returning cached data: ", data);
                return resolve(data);
            }
        }
        else {
            console.log(req.url + " | Clearing cached due to non GET request.");
            setCacheData(req.url, null);
        }

        axios(req).then((res) => {
            const output = { data: res.data, res: res };
            if (req.method === "GET") {
                console.log(req.url + " | Setting cached data: ", output);
                setCacheData(req.url, output);
            }
            resolve(output);
        }).catch(e => {
            reject(e);
            console.error(e);
        });
    });
};

export const req = (url, data, req) => new Promise((resolve, reject) => request(url, data, req).then(response => resolve(response.data)).catch(err => reject(err)));

