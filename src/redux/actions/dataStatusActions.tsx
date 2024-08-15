import { DataStatusType } from "../../Types";
import { DATA_STATUS } from "./actionTypes";

const changeDataStatus = (status: DataStatusType) => ({
    type: DATA_STATUS,
    payload: status
})

export { changeDataStatus };
