import React from 'react'
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from './Actions';


export const initState = {
    loading: true,
    order: null,
    error: '',
}

export const OrderSubmittedPageReducer = (state, { type, payload }) => {
    switch (type) {
      case GET_REQUEST:
        return { ...state, loading: true, error: '' };
      case GET_SUCCESS:
        return { ...state, loading: false, order: payload, error: '' };
      case GET_FAIL:
        return { ...state, loading: false, error: payload };
  
      default:
        return state;
    }
  };