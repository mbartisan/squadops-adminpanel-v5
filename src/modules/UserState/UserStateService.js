import { request, req } from "../../services/APIService";

export const getBaseURL = () => ``;

export const getLogin = () => req(`${getBaseURL()}/login`);

export const login = (login) => {
    return new Promise((resolve, reject) => {
        request(getBaseURL() + "/login", login, { method: "POST" }).then(({ data }) => {
            return resolve(data);
        }).catch(err => reject(err));
    });
};

export const getUser = () => {
    return new Promise((resolve, reject) => {
        request(getBaseURL() + "/@user").then(({ data }) => {
            return resolve(data);
        }).catch(err => reject(err));
    });
};

export const getOrg = () => {
    return new Promise((resolve, reject) => {
        request(getBaseURL() + "/@org").then(({ data }) => {
            return resolve(data);
        }).catch(err => reject(err));
    });
};

export const getMe = () => {
    return new Promise((resolve, reject) => {
        request(getBaseURL() + "/@org/@me").then(({ data }) => {
            return resolve(data);
        }).catch(err => reject(err));
    });
};

export const setSteam64 = (steam64) => req(getBaseURL() + "/@user", { steam64 }, { method: "PUT" });
export const setDiscordId = (discordId) => req(getBaseURL() + "/@user", { discordId }, { method: "PUT" });
export const setEmail = (email) => req(getBaseURL() + "/@user", { email }, { method: "PUT" });
export const setName = (name) => req(getBaseURL() + "/@user", { name }, { method: "PUT" });
