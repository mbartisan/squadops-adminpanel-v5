import { request, req } from "../../services/APIService";

export const getBaseURL = () => `/steam`;

export const getProfiles = (ids) => req(`${getBaseURL()}/profile/${(Array.isArray(ids)) ? ids.join(",") : ids}`);
