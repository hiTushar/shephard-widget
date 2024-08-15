import { DataStatusType } from "../../Types";
import { DATA_STATUS } from "../actions/actionTypes";

const initialState: { dataStatus: DataStatusType } = {
    dataStatus: 'OK'
};

const dataStatusReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case DATA_STATUS: {
            return { ...state, dataStatus: action.payload };
        }
        default:
            return state;
    }
}

export default dataStatusReducer;
