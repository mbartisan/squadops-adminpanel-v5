import { combineReducers } from 'redux';

import Common from "./modules/Common/CommonReducer";
import UserState from "./modules/UserState/UserStateReducer";
import Org from "./modules/Org/OrgReducer";

export default combineReducers({
    Common,
    Org,
})
