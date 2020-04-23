import axios from 'axios';

import { API_HOST } from "../../config/index.js";
import { getAccessToken } from "../auth/index.js";
import makeV5ApiService from "./v5/index.js";

const v5 = makeV5ApiService({ request });
const api = Object.freeze({
    v5
});

export default api;
export {
    v5
}

function request(url, data, req = {}) {
    return new Promise( (resolve, reject) => {
        if (url.charAt(0) !== "/") url = "/" + url;
        const defaultMethod = (data == null) ? "GET" : "POST";
        const headers = req.headers || {};
        const request = {
            method: defaultMethod,
            url:  API_HOST + url,
            data: data,
            params: null,
            ...req,
            headers: {
                "X-SQUADOPS-ACCESS-TOKEN": getAccessToken(),
                ...headers
            },
        };
        axios(request).then((response) => {
            resolve(response);
        }).catch(e => {
            reject(e);
            console.error(e);
        });
    });
}
