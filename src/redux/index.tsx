import { combineReducers } from "redux";
import viewReducer from "./reducers/viewReducer";
import dataStatusReducer from "./reducers/dataStatusReducer";

const rootReducer = combineReducers({
    viewReducer,
    dataStatusReducer
})

export default rootReducer;
