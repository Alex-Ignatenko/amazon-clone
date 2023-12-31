import React, {useContext, useEffect, useReducer} from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../../context/store';
import { ProductPageReducer, initState } from '../../Reducers/ProductPageReducer.js';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL} from '../../Reducers/Actions'
import  {toast}  from 'react-toastify';
import axios from 'axios';
import Loading from '../../components/Loading';
import MsgBox from '../../components/MsgBox';
import { addToCartHandler } from '../../Services/AddToCart';
import ProductDetails from '../../components/ProductDetails/ProductDetails';
import { ToastErrorSettings } from '../../Services/ToastErrorSettings';

const ProductPage = () => {   

    //Get URL Params to get token from them
    const params = useParams();
    const token = params.token;

    const {state, dispatch: ctxDispatch} = useContext(store);
    const {cart: {cartItems}}= state;

    const [{ loading, error, product }, dispatch] = useReducer(ProductPageReducer,initState);

    const addToCart = async () => {
      await addToCartHandler(product, cartItems, ctxDispatch);
    };

    useEffect(() => {

      const getProduct = async () => {
        dispatch({ type: GET_REQUEST });
        try {
          const res = await axios.get(`/products/token/${token}`);
          dispatch({ 
            type: GET_SUCCESS,
            payload: res.data});
        } catch (error) {
          dispatch({ type: GET_FAIL, payload: error.message });
          toast.error(error.message, ToastErrorSettings);
        }
      };
      getProduct();
    },[token]);

    return (
        <>
          <h1 className="my-4">About this product...</h1>
          {loading ? (
            <Loading />
          ) : error ? (
            <MsgBox variant="danger">{error}</MsgBox>
          ) : (
            <ProductDetails product={product} addToCart={addToCart} />
          )}
        </>
      );
}

export default ProductPage