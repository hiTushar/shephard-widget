const initialState = {
    level: 'platform',
    id: 'all'
}

const toolbarReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'TOOLBAR_CHANGE':
            return action.payload;
        default:
            return state;
    }
}

export default toolbarReducer;
