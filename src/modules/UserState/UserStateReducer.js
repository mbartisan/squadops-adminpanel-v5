import {clearAuth} from "../../services/AuthService";

const actions = new Map();

export const slice = "UserState";

export const types = {
    SET_USER_STATE: "SET_USER_STATE",
    CLEAR_USER_STATE: "CLEAR_USER_STATE",
    LOGIN: "LOGIN",
    LOGOUT: "LOGOUT",
    ORG_SELECTED: "ORG_SELECTED",
};

const AWN_STAFF_IDS = [100,101];
const AWN_ORG_ID = 500;

const initialState = {
    user: { orgs: {} },
    org: {},
    role: {},
    isLoggedIn: false,
    orgSelected: false,
    isAWNOrg: false,
    isAWNStaff: false,
};

actions.set(types.SET_USER_STATE, ({ user, org, role }) => {
    return {
        user,
        org,
        role,
        isLoggedIn: (user != null && user.id != null && user.id !== ""),
        orgSelected: (org != null && org.id != null && org.id !== ""),
        isAWNStaff: (user != null && user.id != null && user.id !== "" && AWN_STAFF_IDS.includes(parseInt(user.id))),
        isAWNOrg: (org != null && org.id != null && org.id !== "" && parseInt(org.id) === AWN_ORG_ID)
    }
});

actions.set(types.CLEAR_USER_STATE, () => {
    return initialState;
});

actions.set(types.LOGIN, ({auth,user}) => {
    return { isLoggedIn: true, isAWNStaff: AWN_STAFF_IDS.includes(user.id), auth, user }
});

actions.set(types.LOGOUT, () => {
    // localStorage.removeItem("awn_auth_access_token");
    // localStorage.removeItem("awn_auth_user_id");
    // localStorage.removeItem("awn_auth_org_id");
    return initialState;
});

actions.set(types.ORG_SELECTED, ({ user, org, role }) => {
    return { orgSelected: true, isAWNOrg: org.id === AWN_ORG_ID, user, org, role }
});

export const reducer = (state = initialState, action) => {
    if (action.slice !== slice) return state;
    if (!actions.has(action.type)) return state;
    const func = actions.get(action.type);
    const data = func(action.payload, state);
    if (!data) return state;
    return { ...state, ...data };
};

export default reducer;
