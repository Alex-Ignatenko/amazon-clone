import React, {useContext, useEffect, useReducer, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { store } from '../../context/store';
import { PlaceOrderPageReducer } from '../../Reducers/PlaceOrderPageReducer';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL, CLEAR_CART } from '../../Reducers/Actions'
import Title from '../../components/Title/Title';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { Button, Card,ListGroup ,Row, Col } from 'react-bootstrap';
import  {toast}  from 'react-toastify';
import axios from 'axios';
import Loading from '../../components/Loading';
import { ToastErrorSettings } from '../../Services/ToastErrorSettings';
import './PlaceOrderPage.css';


const TAX_RATE = 0.17; 
const SHIPPING_RATE_UNDER = 0.1; 
const SHIPPING_RATE_ABOVE = 0.02;  

const PlaceOrderPage = () => {

const [ {loading}, dispatch] = useReducer(PlaceOrderPageReducer, {loading: false}); 
const { state, dispatch: ctxDispatch } = useContext(store);
const { cart, userInfo } = state;
const { paymentMethod } = cart;

const navigate = useNavigate()

const submitOrderHandler = async (e) => {
    
    try {
        e.preventDefault();

        dispatch({type: GET_REQUEST});

        const data = await axios.post('/orders', {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }, {
            headers: {
                authorization: userInfo.token,
            }
        });

        dispatch({type: GET_SUCCESS});    
        ctxDispatch({type: CLEAR_CART });
        navigate(`/order/${data.order._id}`);

    } catch (error) {
        dispatch({type: GET_FAIL});
        toast.error(error.message,ToastErrorSettings);
    }
};

const round2 = (number) => {
   return Math.round(number * 100 +Number.EPSILON) / 100;  
};

cart.itemsPrice = round2(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0));
cart.taxPrice = round2(cart.itemsPrice * TAX_RATE);
cart.shippingPrice = round2(cart.itemsPrice > 50 ? cart.itemsPrice * SHIPPING_RATE_ABOVE : cart.itemsPrice * SHIPPING_RATE_UNDER );
cart.totalPrice = round2(cart.itemsPrice + cart.taxPrice + cart.shippingPrice);

useEffect(() => {
    if(!paymentMethod){
        navigate('/order');
    }
},[])

return (
    <>
        <Title title="Orders Summary" />
        <CheckoutSteps step1 step2 step3 step4 />
        <h1 className="my-3">Order Summary</h1>
        <Row>
            <Col md={8}>
            <Card className="mb-3">
                <Card.Body>
                <Card.Title>Shipping</Card.Title>
                <Card.Text>
                    <strong>Name: </strong>
                    {cart.shippingAddress.fullName}
                    <br />
                    <strong>Address: </strong>
                    {cart.shippingAddress.address}
                    <br />
                    <strong>City: </strong>
                    {cart.shippingAddress.city}
                    <br />
                    <strong>Country: </strong>
                    {cart.shippingAddress.country}
                </Card.Text>
                </Card.Body>
            </Card>
            <Card className="mb-3">
                <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </Card.Text>
                <Link to="/payment">Edit</Link>
                </Card.Body>
            </Card>
            <Card className="mb-3">
                <Card.Body className='items-card'>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                    {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                        <Col md={6}>
                            <img src={item.image} alt={item.title} className="img-fluid rounded img-thumbnail mt-2"/>
                            <Link to={`/product/${item.token}`} className='text-shortner mt-2 mb-2'>{item.title}</Link>
                        </Col>
                        <Col md={3}>
                            <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>${item.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                <Link to="/cart">Edit</Link>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
            <Card className='summary-card'>
                <Card.Body>
                <Card.Title>Summary: </Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    <Row>
                        <Col>Items: </Col>
                        <Col>${cart.itemsPrice}</Col>
                    </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Row>
                        <Col>Shipping: </Col>
                        <Col>${cart.shippingPrice}</Col>
                    </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Row>
                        <Col>Tax: </Col>
                        <Col>${cart.taxPrice}</Col>
                    </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <Row>
                        <Col>Total: </Col>
                        <Col>
                        <strong>${cart.totalPrice}</strong>
                        </Col>
                    </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <div className="d-grid">
                        <Button type="button" onClick={submitOrderHandler} disabled={cart.cartItems.length === 0}>Submit</Button>
                    </div>
                    <div>
                        {loading && <Loading />}
                    </div>
                    </ListGroup.Item>
                </ListGroup>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderPage