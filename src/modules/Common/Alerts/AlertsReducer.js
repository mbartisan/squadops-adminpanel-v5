import React from "react";

const actions = new Map();

export const slice = "Common/Alerts";

export const types = {
    SEND_ALERT: "SEND_ALERT",
    CLEAR_ALERT: "CLEAR_ALERT",
    CLEAR_ALL_ALERTS: "CLEAR_ALL_ALERTS"
};

const initialState = {
    alerts: []
};

actions.set(types.SEND_ALERT, (alert, state) => {
    return { alerts: [...state.alerts, alert] }
});

actions.set(types.CLEAR_ALERT, (index, state) => {
    state.alerts.splice(index, 1);
    return { alerts: [...state.alerts] }
});

actions.set(types.CLEAR_ALL_ALERTS, () => {
    return { alerts: [] }
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
