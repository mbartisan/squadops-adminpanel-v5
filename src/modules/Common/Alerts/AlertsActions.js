import { types, slice } from "./AlertsReducer";

export const sendAlert = (message, actions) => {
    return (dispatch) => {
        dispatch({
            slice,
            type: types.SEND_ALERT,
            payload: { message, actions }
        })
    }
};

export const clearAlert = (alert) => {
    return (dispatch) => {
        dispatch({
            slice,
            type: types.CLEAR_ALERT,
            payload: alert
        })
    }
};

export const clearAllAlerts = () => {
    return (dispatch) => {
        dispatch({
            slice,
            type: types.CLEAR_ALL_ALERTS,
            payload: null
        })
    }
};
