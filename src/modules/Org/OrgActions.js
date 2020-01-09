import { types, slice } from "./OrgReducer";
import * as OrgService from "./OrgService";

export const getOrgs = () => (dispatch) => OrgService.getOrgs()
    .then(orgs => dispatch({ slice, type: types.GET_ORGS, payload: orgs }));
export const getOrg = (orgId) => (dispatch) => OrgService.getOrg(orgId)
    .then(org => dispatch({ slice, type: types.GET_ORG, payload: org }));
export const updateOrg = (orgId, { name }) => (dispatch) => OrgService.updateOrg(orgId, { name })
    .then(org => dispatch({ slice, type: types.UPDATE_ORG, payload: org }));

export const getOrgUsers = (orgId) => (dispatch) => OrgService.getOrgUsers(orgId)
    .then(orgUsers => dispatch({ slice, type: types.GET_ORG_USERS, payload: orgUsers }));
export const createOrgUser = (orgId, { userId }) => (dispatch) => OrgService.createOrgUser(orgId, { userId })
    .then(orgUser => dispatch({ slice, type: types.CREATE_ORG_USERS, payload: orgUser }));
export const getOrgUser = (orgId, userId) => (dispatch) => OrgService.getOrgUser(orgId, userId)
    .then(orgUser => dispatch({ slice, type: types.GET_ORG_USER, payload: orgUser }));
export const deleteOrgUser = (orgId, userId) => (dispatch) => OrgService.deleteOrgUser(orgId, userId)
    .then(orgUser => dispatch({ slice, type: types.DELETE_ORG_USER, payload: orgUser }));

export const getRoles = (orgId) => (dispatch) => OrgService.getRoles(orgId)
    .then(roles => dispatch({ slice, type: types.GET_ROLES, payload: roles }));
export const createRole = (orgId, { name }) => (dispatch) => OrgService.createRole(orgId, { name })
    .then(role => dispatch({ slice, type: types.CREATE_ROLE, payload: role }));
export const getRole = (orgId, roleId) => (dispatch) => OrgService.getRole(orgId, roleId)
    .then(role => dispatch({ slice, type: types.GET_ROLE, payload: role }));
export const updateRole = (orgId, roleId, { name }) => (dispatch) => OrgService.updateRole(orgId, roleId,{ name })
    .then(role => dispatch({ slice, type: types.UPDATE_ROLE, payload: role }));
export const deleteRole = (orgId, roleId) => (dispatch) => OrgService.deleteRole(orgId, roleId)
    .then(role => dispatch({ slice, type: types.DELETE_ROLE, payload: role }));

export const getRoleUsers = (orgId, roleId) => (dispatch) => OrgService.getRoleUsers(orgId, roleId)
    .then(roleUsers => dispatch({ slice, type: types.GET_ROLE_USERS, payload: roleUsers }));
export const createRoleUser = (orgId, roleId, { name }) => (dispatch) => OrgService.createRoleUser(orgId, roleId, { name })
    .then(roleUser => dispatch({ slice, type: types.CREATE_ROLE_USER, payload: roleUser }));
export const getRoleUser = (orgId, roleId, userId) => (dispatch) => OrgService.getRoleUser(orgId, roleId, userId)
    .then(roleUser => dispatch({ slice, type: types.GET_ROLE_USER, payload: roleUser }));
export const deleteRoleUser = (orgId, roleId, userId) => (dispatch) => OrgService.deleteRoleUser(orgId, roleId, userId)
    .then(roleUser => dispatch({ slice, type: types.DELETE_ROLE_USER, payload: roleUser }));

export const getTeams = (orgId) => (dispatch) => OrgService.getTeams(orgId)
    .then(teams => dispatch({ slice, type: types.GET_TEAMS, payload: teams }));
export const createTeam = (orgId, { name }) => (dispatch) => OrgService.createTeam(orgId, { name })
    .then(team => dispatch({ slice, type: types.CREATE_TEAM, payload: team }));
export const getTeam = (orgId, teamId) => (dispatch) => OrgService.getTeam(orgId, teamId)
    .then(team => dispatch({ slice, type: types.GET_TEAM, payload: team }));
export const deleteTeam = (orgId, teamId) => (dispatch) => OrgService.deleteTeam(orgId, teamId)
    .then(team => dispatch({ slice, type: types.DELETE_TEAM, payload: team }));

export const getTeamUsers = (orgId, roleId) => (dispatch) => OrgService.getTeamUsers(orgId, roleId)
    .then(teamUsers => dispatch({ slice, type: types.GET_TEAM_USERS, payload: teamUsers }));
export const createTeamUser = (orgId, roleId, { userId, isLeader }) => (dispatch) => OrgService.createTeamUser(orgId, roleId, { userId, isLeader })
    .then(teamUser => dispatch({ slice, type: types.CREATE_TEAM_USER, payload: teamUser }));
export const getTeamUser = (orgId, roleId, userId) => (dispatch) => OrgService.getTeamUser(orgId, roleId, userId)
    .then(teamUser => dispatch({ slice, type: types.GET_TEAM_USER, payload: teamUser }));
export const updateTeamUser = (orgId, roleId, userId, { isLeader }) => (dispatch) => OrgService.updateTeamUser(orgId, roleId,{ isLeader })
    .then(teamUser => dispatch({ slice, type: types.UPDATE_TEAM_USER, payload: teamUser }));
export const deleteTeamUser = (orgId, roleId, userId) => (dispatch) => OrgService.deleteTeamUser(orgId, roleId, userId)
    .then(teamUser => dispatch({ slice, type: types.DELETE_TEAM_USER, payload: teamUser }));