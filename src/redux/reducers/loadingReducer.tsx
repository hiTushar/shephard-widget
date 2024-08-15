const initialState = {
    isLoading: false,
    data: null,
    error: false
};

const loadingReducer = (state = initialState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case 'DATA_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
}

export default loadingReducer;
