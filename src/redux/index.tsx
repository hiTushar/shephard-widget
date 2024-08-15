import { combineReducers } from "redux";
import viewReducer from "./reducers/viewReducer";
import loadingReducer from "./reducers/loadingReducer";

const rootReducer = combineReducers({
    viewReducer,
    loadingReducer
})

export default rootReducer;
