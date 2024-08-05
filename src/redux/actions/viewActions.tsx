import { ViewReducerInterface } from "../../Types";
import { VIEW_CHANGE } from "./actionTypes";

const viewChange = (obj: ViewReducerInterface) => ({
    type: VIEW_CHANGE,
    payload: obj
})

export { viewChange };
