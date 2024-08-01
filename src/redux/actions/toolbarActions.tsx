import { TOOLBAR_CHANGE } from "./actionTypes";

const toolbarChange = (obj) => ({
    type: TOOLBAR_CHANGE,
    payload: obj
})

export { toolbarChange };
