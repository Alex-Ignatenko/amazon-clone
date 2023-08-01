import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from "../../Reducers/Actions";


export const initState = {
    loading: true,
    error: "",
    products: [],
};

export const SeacrhPageReducer = (state, { type, payload }) => {
    switch (type) {
        case GET_REQUEST:
            return {...state, loading: true};
        case GET_SUCCESS:
            return {...state, loading: false, products: payload.products, page: payload.page, pages: payload.pages, countProducts: payload.countProducts};
        case GET_FAIL:
            return {...state, loading: false, error: payload};
        default:
            return state;
    }
};

export const prices = [ 
    {name: '$1 - $ 50', value: '1-50'},
    {name: '$51 - $ 200', value: '51-200'},
    {name: '$201 - $ 1000', value: '201-1000'}];

export const ratings = [
    {name: '4 starts and above', value: 4},
    {name: '3 starts and above', value: 3},
    {name: '2 starts and above', value: 2},
    {name: '1 starts and above', value: 1}];