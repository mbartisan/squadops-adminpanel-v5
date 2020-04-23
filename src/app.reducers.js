import { combineReducers } from 'redux';

import Common from "./modules/Common/CommonReducer";
import UserState from "./modules/UserState/UserStateReducer";
import Org from "./modules/Org/OrgReducer";
import GameServers from "./modules/GameServers/GameServersReducer";
import DedicatedBoxes from "./modules/DedicatedBoxes/DedicatedBoxesReducer";

export default combineReducers({
    Common,
    UserState,
    Org,
    GameServers,
    DedicatedBoxes
})
