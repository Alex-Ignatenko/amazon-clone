import React, { useContext } from 'react'
import { store } from "../../context/store";
import { useNavigate } from "react-router-dom";
import Title from '../../components/Title/Title';
import { Col, Row } from 'react-bootstrap';
import Cart from '../../components/Cart/Cart';
import Total from '../../components/Cart/Total';
import axios from 'axios';
import  {toast}  from 'react-toastify';
import { ToastErrorSettings } from '../../Services/ToastErrorSettings';
import { ADD_TO_CART,GET_FAIL, REMOVE_FROM_CART } from '../../Reducers/Actions';

const CartPage = () => {

    const navigate = useNavigate();
    const {state,dispatch: ctxDispatch} = useContext(store);
    const { cart, userInfo} = state;
    const {cartItems} = cart;

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };

    const updateCartHandler = async (item,quantity) => {
        try {
            const {data} = await axios.get('/products/id/'+item._id);

            if (data.countInStock < quantity) {
                toast.error("Sorry, we don't have that many in stock",ToastErrorSettings);
                return;
            }
            ctxDispatch({type: ADD_TO_CART,payload: {...item,quantity}});
        } catch (error) {
            ctxDispatch({type: GET_FAIL,payload: error.message});
            toast.error("Error",ToastErrorSettings);
        }
    };

    const removeItemHandler = async (item) => {
        ctxDispatch({type: REMOVE_FROM_CART,payload: item});
    };

    return (
    <>
        <Title title="Shopping Cart"></Title>
        <h1 className="my-4">Your Cart</h1>
        <Row>
            <Col mb={8}>
                <Cart cartItems={cartItems} updateCartHandler={updateCartHandler} removeItemHandler={removeItemHandler} />
            </Col>
            <Col mb={4}>
                <Total cartItems={cartItems} checkoutHandler={checkoutHandler}></Total>
            </Col>
        </Row>

    </>
  )
}

export default CartPage