import {Reducer} from "../Common/CommonReducer";
const slice = "Org";
const types = {
    CREATE_ORG: "CREATE_ORG",
    GET_ORG: "GET_ORG",
    UPDATE_ORG: "UPDATE_ORG",
    DELETE_ORG: "DELETE_ORG",

    GET_ORG_USERS: "GET_ORG_USERS",
    CREATE_ORG_USER: "CREATE_ORG_USER",
    GET_ORG_USER: "GET_ORG_USER",
    DELETE_ORG_USER: "DELETE_ORG_USER",

    GET_ROLES: "GET_ROLES",
    CREATE_ROLE: "CREATE_ROLE",
    GET_ROLE: "GET_ROLE",
    UPDATE_ROLE: "UPDATE_ROLE",
    DELETE_ROLE: "DELETE_ROLE",

    GET_ROLE_USERS: "GET_ROLES",
    CREATE_ROLE_USER: "CREATE_ROLE",
    GET_ROLE_USER: "GET_ROLE",
    UPDATE_ROLE_USER: "UPDATE_ROLE",
    DELETE_ROLE_USER: "DELETE_ROLE",

    GET_TEAMS: "GET_TEAMS",
    CREATE_TEAM: "CREATE_TEAM",
    GET_TEAM: "GET_TEAM",
    UPDATE_TEAM: "UPDATE_TEAM",
    DELETE_TEAM: "DELETE_TEAM",

    GET_TEAM_USERS: "GET_TEAMS",
    CREATE_TEAM_USER: "CREATE_TEAM",
    GET_TEAM_USER: "GET_TEAM",
    UPDATE_TEAM_USER: "UPDATE_TEAM",
    DELETE_TEAM_USER: "DELETE_TEAM",
};
const initialState = {
    org: null,
    user: null,
    users: [],
    role: null,
    roles: [],
    roleUser: null,
    roleUsers: [],
    team: null,
    teams: [],
    teamUsers: []
};
const reducer = new Reducer(slice, types, initialState);

reducer.external("UserState", "ORG_SELECTED", () => {
    return reducer.initialState;
});

reducer.action(types.GET_ORG, (org) => ({ org }));
reducer.action(types.UPDATE_ORG, (org) => ({ org }));

reducer.action(types.GET_ORG_USERS, (orgUser) => ({ user: orgUser }));
reducer.action(types.CREATE_ORG_USER, (orgUser) => ({ user: orgUser }));
reducer.action(types.GET_ORG_USER, (orgUser) => ({ user: orgUser }));
reducer.action(types.DELETE_ORG_USER, (orgUser) => ({ user: orgUser }));

reducer.action(types.GET_ROLES, (roles) => ({ roles }));
reducer.action(types.CREATE_ROLE, (role) => ({ role }));
reducer.action(types.GET_ROLE, (role) => ({ role }));
reducer.action(types.DELETE_ROLE, (role) => ({ role }));

reducer.action(types.GET_ROLE_USERS, (roleUsers) => ({ roleUsers }));
reducer.action(types.CREATE_ROLE_USER, (role) => ({ role }));
reducer.action(types.GET_ROLE_USER, (role) => ({ role }));
reducer.action(types.DELETE_ROLE_USER, (role) => ({ role }));

export default reducer.reducer;
export { types, slice };
