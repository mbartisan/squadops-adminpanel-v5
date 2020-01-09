import {combineReducers} from "redux";

import Alerts from "./Alerts/AlertsReducer";

export default combineReducers({
    Alerts
});

export class Reducer {

    constructor(slice, types, initialState) {
        this.slice = slice;
        this.initialState = initialState;
        this.types = types;
        this._actions = new Map();
        this._externals = new Map();
    }

    get reducer() {
        return (state = this.initialState, action) => {
            if (action.slice !== this.slice) {
                // console.log(action);
                if (!this._externals.has(action.slice+"/"+action.type)) return state;
                console.log(this.slice+" is responding to external action: " + action.slice+"/"+action.type);
                const func = this._externals.get(action.slice+"/"+action.type);
                const data = func(action.payload, state);
                if (!data) return state;
                return { ...state, ...data };
            }
            if (!this._actions.has(action.type)) return state;
            const func = this._actions.get(action.type);
            const data = func(action.payload, state);
            if (!data) return state;
            return { ...state, ...data };
        }
    }

    get export() {
        const { slice, initialState, types } = this.toObject();
        return { slice, initialState, types };
    }

    type(type) {
        this.types[type] = type;
        return type;
    }

    action(type, action) {
        if (this.types[type] == null) throw new Error(`Type ${type} not found in the ${this.slice} reducer.`);
        this._actions.set(type, action.bind(this));
    }

    external(slice, type, action) {
        this._externals.set(slice + "/" + type, action.bind(this));
    }

    toObject() {
        return {
            slice: this.slice,
            initialState: this.initialState,
            types: this.types
        }
    }
}
