import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from './Actions'


export const initState = {
    loading: false,
};

export const PlaceOrderPageReducer = (state, { type }) => {
    switch (type) {
        case GET_REQUEST:
            return {...state, loading: true};
        case GET_SUCCESS:
            return {...state, loading: false};
        case GET_FAIL:
            return {...state, loading: false};
        default:
            return state
}};