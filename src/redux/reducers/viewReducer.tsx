import { ViewReducerInterface } from "../../Types";

const initialState: ViewReducerInterface = { type: 'platform', platformId: 'all', alertId: '', groupId: '' }

const viewReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'VIEW_CHANGE':
            return action.payload;
        default:
            return state;
    }
}

export default viewReducer;
