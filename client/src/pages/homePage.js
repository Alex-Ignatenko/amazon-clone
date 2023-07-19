import axios from 'axios';
import React, { useState,useEffect, useReducer } from'react';
import Products from '../components/Products/Products.jsx';
import "./HomePage.css";

import MsgBox from "../components/MsgBox";
import  Loading  from "../components/Loading";
import { homePageReducer, initState } from '../reducers/homePageReducer.js';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from "../reducers/Actions";

const HomePage = () => {

    //const [products, setProducts] = useState([]);
    const [{loading,error,products},dispatch] = useReducer(homePageReducer,initState);

    useEffect(() => {
        // axios.get('/products').then((res) => setProducts(res.data));
        // return () => {};
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
        // return () => {};
    },[]);

    return (
        <div className="App">
            <main>
                <h1>Products</h1>
                <div className="products">
                    {loading? <Loading></Loading> : error? <MsgBox variant="danger">{error}</MsgBox> : <Products products={products}></Products>}          
                </div>
            </main>
        </div>
    )
}

export default HomePage;