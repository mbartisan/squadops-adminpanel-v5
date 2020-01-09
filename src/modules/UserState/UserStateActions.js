import { types, slice } from "./UserStateReducer";

import * as UserStateService from "./UserStateService";
import {clearAuth} from "../../services/AuthService";

export const setUserState = (userState) => dispatch => {
    dispatch({
        slice,
        type: types.SET_USER_STATE,
        payload: userState
    })
};

export const clearUserState = () => dispatch => {
    dispatch({
        slice,
        type: types.CLEAR_USER_STATE
    })
};

export const login = (data) => dispatch => {
    UserStateService.login(data).then(auth => {
        // if (auth.accessToken) localStorage.setItem("awn_auth_access_token", auth.accessToken);
        // if (auth.user.id) localStorage.setItem("awn_auth_user_id", auth.user.id);
        UserStateService.getUser().then((user) => {
            dispatch({
                slice,
                type: types.LOGIN,
                payload: {auth,user}
            })
        });
    })
};

export const logout = () => dispatch => {
    clearAuth();
    // localStorage.removeItem("awn_auth_access_token");
    // localStorage.removeItem("awn_auth_user_id");
    // localStorage.removeItem("awn_auth_org_id");
    // dispatch({
    //     slice,
    //     type: types.LOGOUT,
    //     payload: {}
    // })
};

export const selectOrg = (id) => dispatch => {
    // if (id) localStorage.setItem("awn_auth_org_id", id);
    UserStateService.getMe().then(({ user, org, role }) => {
        dispatch({
            slice,
            type: types.ORG_SELECTED,
            payload: { user, org, role }
        });
    });
};
