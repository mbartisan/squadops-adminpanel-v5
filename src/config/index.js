export const isDev = window.location.toString().indexOf("localhost") !== -1 || window.location.hostname.endsWith(".lan");
export const isDemo = window.location.toString().indexOf("://demo.squadops.gg") !== -1;

const DEFAULT = {
    API_VERSION: "v5",
    AWN_ORG_ID: 500,
    AWN_USER_IDS: [100,101],
    DEMO_ORG_ID: 999,
    DEMO_USER_ID: 999,
    DEMO_ACCESS_TOKEN: "28878104-5af3-40b3-b44f-891f42013c6f",
    COOKIE_NAME_ACCESS_TOKEN: 'SQUADOPS_ACCESS_TOKEN_V5'
};

const PROD = {
    ...DEFAULT,
    API_HOST: "https://api.squadops.gg",
    GOOGLE_ANALYTICS_ID: (isDemo) ? "" : "",
    STRIPE_PUBLIC_KEY: ""
};

const DEV = {
    ...DEFAULT,
    API_HOST: (window.location.hostname.endsWith(".lan")) ? `http://api.squadops.lan` : `http://localhost:4050`,
    GOOGLE_ANALYTICS_ID: null,
    STRIPE_PUBLIC_KEY: "",
    AWN_ORG_ID: 5
};


const CONFIG = (isDev) ? DEV : PROD;

export const API_HOST = CONFIG.API_HOST;
export const API_VERSION = CONFIG.API_VERSION;

export const COOKIE_NAME_ACCESS_TOKEN = CONFIG.COOKIE_NAME_ACCESS_TOKEN;

export const AWN_ORG_ID = CONFIG.AWN_ORG_ID;
export const AWN_USER_IDS = CONFIG.AWN_USER_IDS;

export const DEMO_ORG_ID = CONFIG.DEMO_ORG_ID;
export const DEMO_USER_ID = CONFIG.DEMO_USER_ID;
export const DEMO_ACCESS_TOKEN = CONFIG.DEMO_ACCESS_TOKEN;

export const GOOGLE_ANALYTICS_ID = CONFIG.GOOGLE_ANALYTICS_ID;
export const STRIPE_PUBLIC_KEY = CONFIG.STRIPE_PUBLIC_KEY;

export default CONFIG;
