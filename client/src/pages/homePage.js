import axios from 'axios';
import React, { useEffect, useReducer } from'react';

import Products from '../components/Products/Products.jsx';
import MsgBox from "../components/MsgBox";
import  Loading  from "../components/Loading";
import { homePageReducer, initState } from '../reducers/homePageReducer.js';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from "../reducers/Actions";
import "./HomePage.css";

const HomePage = () => {

    const [{loading,error,products},dispatch] = useReducer(homePageReducer,initState);

    useEffect(() => {
        const getProducts = async () => {
            dispatch({type:GET_REQUEST});
            try {
                const res = await axios.get('/products');
                dispatch({type:GET_SUCCESS,payload:res.data});
            } catch (error) {
                dispatch({type:GET_FAIL,payload:error.message});
            }
        };
        getProducts();
    },[]);

    return (
        <>
        <h1 className="my-3">Products</h1>
        <div className="products">
          {loading ? (
            <Loading></Loading>
          ) : error ? (
            <MsgBox variant="danger">{error}</MsgBox>
          ) : null}
          <Products products={products}></Products>
        </div>
      </>
    )
}

export default HomePage;