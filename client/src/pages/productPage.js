import React, {useContext, useEffect, useReducer} from 'react'
import { useParams } from 'react-router-dom'
import { store } from '../context/store';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL} from '../reducers/Actions'
import Title from '../components/Title/Title';
import { Row, Col } from 'react-bootstrap';
import  {toast}  from 'react-toastify';
import axios from 'axios';
import Loading from '../components/Loading';
import MsgBox from '../components/MsgBox';
import { addToCartHandler } from '../services/AddToCart';
import CartDescription from '../components/Cart/CartDescription';
import ProductDescription from '../components/Product/ProductDescription';




const productPageReducer  = (state, { type, payload }) => {
  switch (type) {
      case GET_REQUEST:
          return {...state, loading: true};
      case GET_SUCCESS:
          return {...state, loading: false, product: payload};
      case GET_FAIL:
          return {...state, loading: false, error: payload};
      default:
          return state
  }};


const ProductPage = () => {   

    const params = useParams();
    const token = params.token;

    const {state, dispatch: ctxDispatch} = useContext(store);
    const {cart: {cartItems}}= state;

    const initState = {
      loading: true,
      error: '',
      product: {}
    };

    const [{ loading, error, product }, dispatch] = useReducer(
      productPageReducer,
      initState
    );

    const errSettings = {
      theme: "colored",
      hideProgressBar: true,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    }

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
          toast.error(error.message, errSettings);
        }
      };
      getProduct();
    },[token]);


    return (
        <div>
          {loading ? (
            <Loading />
          ) : error ? (
            <MsgBox variant="danger">{error}</MsgBox>
          ) : (
            <div>
              <Row>
                <Col md={6}>
                  <img
                    src={`${product.image}`}
                    alt={product.title}
                    className="card-img-top card-image"
                  />
                </Col>
    
                <Col md={3}>
                  <ProductDescription {...product} />
                </Col>
    
                <Col md={3}>
                  <CartDescription product={product} addToCart={addToCart} />
                </Col>
              </Row>
            </div>
          )}
        </div>
      );
}

export default ProductPage