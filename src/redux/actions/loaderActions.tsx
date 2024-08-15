import { DATA_LOADING } from "./actionTypes";

const dataLoading = (isLoading: boolean) => ({
    type: DATA_LOADING,
    payload: isLoading
})

export { dataLoading };
