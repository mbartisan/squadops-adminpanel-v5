export const isProd = window.location.toString().indexOf("localhost") === -1;

const DEFAULT = {
    API_VERSION: "v5",
};

const PROD = {
    ...DEFAULT,
    API_HOST: "https://beta.squadops.gg",
    GOOGLE_ANALYTICS_ID: null
};

const DEV = {
    ...DEFAULT,
    API_HOST: "http://localhost:4051",
    GOOGLE_ANALYTICS_ID: null
};


// export const isProd = true;
const CONFIG = (isProd) ? PROD : DEV;


export const API_HOST = CONFIG.API_HOST;
export const API_VERSION = CONFIG.API_VERSION;

export const GOOGLE_ANALYTICS_ID = CONFIG.GOOGLE_ANALYTICS_ID;

export default CONFIG;
