import {combineReducers} from "redux";
import {selectedUserReducer} from "./selectedUserReducer";

const reducers = combineReducers({
    selectedUser: selectedUserReducer,
    selectedUserId: selectedUserReducer,
});
export default reducers;