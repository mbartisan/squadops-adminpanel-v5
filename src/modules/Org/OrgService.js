import { req } from "../../services/APIService";

export const getBaseURL = (orgId) => `/orgs/${(orgId) ? orgId : ""}`;

export const getOrg = (orgId) => req(getBaseURL(orgId) + "", null, { method: "GET" });
export const updateOrg = (orgId, { name }) => req(getBaseURL(orgId) + "", { name }, { method: "PATCH" });

export const getUsers = (orgId) => req(getBaseURL(orgId) + "/users", null, { method: "GET" });
export const createUser = (orgId, { userId }) => req(getBaseURL(orgId) + "/users", { userId }, { method: "POST" });
export const getUser = (orgId, userId) => req(getBaseURL(orgId) + "/users/" + userId);
export const deleteUser = (orgId, userId) => req(getBaseURL(orgId)+"/users/"+userId, null, { method: "DELETE" });

export const getRoles = (orgId) => req(getBaseURL(orgId) + "/roles", null, { method: "GET" });
export const createRole = (orgId, { name }) => req(getBaseURL(orgId) + "/roles", { name }, { method: "POST" });
export const getRole = (orgId, roleId) => req(getBaseURL(orgId) + "/roles/" + roleId, null, { method: "GET" });
export const updateRole = (orgId, roleId, { name }) => req(getBaseURL(orgId) + "/roles/" + roleId, { name }, { method: "PATCH" });
export const deleteRole = (orgId, roleId) => req(getBaseURL(orgId) + "/roles/" + roleId, null, { method: "DELETE" });

export const getRoleUsers = (orgId, roleId) => req(getBaseURL(orgId) + "/roles/" + roleId + "/users", null, { method: "GET" });
export const createRoleUser = (orgId, roleId, { userId }) => req(getBaseURL(orgId)+"/roles/"+roleId+"/users", { userId }, { method: "POST" });
export const getRoleUser = (orgId, roleId, userId) => req(getBaseURL(orgId) + "/roles/" + roleId + "/users/"+userId, null, { method: "GET" });
export const deleteRoleUser = (orgId, roleId, userId) => req(getBaseURL(orgId)+"/roles/"+roleId+"/users/"+userId, null, { method: "DELETE" });

export const getTeams = (orgId) => req(getBaseURL(orgId) + "/teams", null, { method: "GET" });
export const createTeam = (orgId, { name }) => req(getBaseURL(orgId) + "/teams", { name }, { method: "POST" });
export const getTeam = (orgId, teamId) => req(getBaseURL(orgId) + "/teams/" + teamId, null, { method: "GET" });
export const deleteTeam = (orgId, teamId) => req(getBaseURL(orgId) + "/teams/"+teamId, null, { method: "DELETE" });

export const getTeamUsers = (orgId, teamId) => req(getBaseURL(orgId) + "/teams/" + teamId + "/users", null, { method: "GET" });
export const createTeamUser = (orgId, teamId, { userId, isLeader }) => req(getBaseURL(orgId)+"/teams/"+teamId+"/users", { userId, isLeader }, { method: "POST" });
export const getTeamUser = (orgId, teamId, userId) => req(getBaseURL(orgId) + "/teams/" + teamId + "/users/"+userId, null, { method: "GET" });
export const updateTeamUser = (orgId, teamId, userId, { isLeader }) => req(getBaseURL(orgId) + "/roles/" + teamId+"/users/"+userId, { isLeader }, { method: "PATCH" });
export const deleteTeamUser = (orgId, teamId, userId) => req(getBaseURL(orgId)+"/teams/"+teamId+"/users/"+userId, null, { method: "DELETE" });

// export const setRolePermissionAllow = (roleId, perm) => {
//     return new Promise((resolve, reject) => {
//         request(getBaseURL() + "/roles/" + roleId + "/" + perm + "/allow", null, { method: "POST" }).then(({ data }) => {
//             return resolve(data);
//         }).catch(err => reject(err));
//     });
// };
//
// export const setRolePermissionPassthrough = (roleId, perm) => {
//     return new Promise((resolve, reject) => {
//         request(getBaseURL() + "/roles/" + roleId + "/" + perm + "/passthrough", null, { method: "POST" }).then(({ data }) => {
//             return resolve(data);
//         }).catch(err => reject(err));
//     });
// };
//
// export const setRolePermissionDeny = (roleId, perm) => {
//     return new Promise((resolve, reject) => {
//         request(getBaseURL() + "/roles/" + roleId + "/" + perm + "/deny", null, { method: "POST" }).then(({ data }) => {
//             return resolve(data);
//         }).catch(err => reject(err));
//     });
// };
