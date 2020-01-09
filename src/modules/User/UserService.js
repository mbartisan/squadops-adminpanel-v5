import { req } from "../../services/APIService";

export const getBaseURL = (userId) => `/users/${(userId) ? userId : ""}`;

export const getUsers = () => req(getBaseURL(), null, { method: "GET" });
export const createUser = ({ name, email }) => req(getBaseURL(), { name, email }, { method: "POST" });
export const getUser = (userId) => req(getBaseURL(userId));
export const updateUser = (userId, { name, email }) => req(getBaseURL(userId), { name, email }, { method: "PATCH" });
