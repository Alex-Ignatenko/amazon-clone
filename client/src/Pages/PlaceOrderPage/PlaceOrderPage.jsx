import React, {useContext, useEffect, useReducer, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { store } from '../../context/store';
import { PlaceOrderPageReducer } from '../../Reducers/PlaceOrderPageReducer';
import { CREATE_REQUEST, CREATE_SUCCEEDED, CREATE_FAILED, CLEAR_CART } from '../../Reducers/Actions'
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
    e.preventDefault();
    try {

        dispatch({type: CREATE_REQUEST});

        const {data} = await axios.post('/orders', 
        {
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

        dispatch({type: CREATE_SUCCEEDED});    
        ctxDispatch({type: CLEAR_CART });
        navigate(`/ordersubmitted/${data.order._id}`);

    } catch (error) {
        dispatch({type: CREATE_FAILED});
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
        <Title title="Order Summary" />
        <CheckoutSteps step1 step2 step3 step4 />
        <h1 className="my-4">Order Summary</h1>
        <Row>
            <Col md={8}>
            <Card className="mb-4">
                <Card.Body>
                <Card.Title><strong>Shipping</strong></Card.Title>
                <Card.Text className='m-1 p-1'>
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
                <hr />
                <div className='px-3 d-grid'>
                <Button type="button" onClick={() =>navigate('/shipping')}>Edit</Button>
                </div>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Body>
                <Card.Title><strong>Payment</strong></Card.Title>
                <Card.Text className='m-1 p-1'>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </Card.Text>
                <hr />
                <div className=' px-3 d-grid'>
                    <Button type="button" onClick={() =>navigate('/payment')}>Edit</Button>
                </div>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Body className='items-card'>
                <Card.Title><strong>Cart</strong></Card.Title>
                <ListGroup variant="flush" className='m-1 p-1'>
                    {cart.cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                        <Row className="align-items-center">
                        <Col md={6}>
                        <div className='tumb-img-container'>
                            <Link to={`/product/${item.token}`}><img src={item.image} alt={item.title} className="img-fluid rounded tumb-img px-2 py-2"/></Link>
                            <Link to={`/product/${item.token}`} className='text-shortner mt-2 mb-2'>{item.title}</Link>
                        </div>
                        </Col>
                        <Col md={3}>
                            <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>${item.price}</Col>
                        </Row>
                    </ListGroup.Item>
                    ))}
                </ListGroup>
                <hr />
                <div className='px-3 d-grid'>
                    <Button type="button" onClick={() =>navigate('/cart')}>Edit</Button>
                </div>
                </Card.Body>
            </Card>
            </Col>
            <Col md={4}>
            <Card className='summary-card'>
                <Card.Body>
                <Card.Title>Summary: </Card.Title>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <div className='summery-line'>
                            <div>Items: </div>
                            <div>${cart.itemsPrice}</div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='summery-line'>
                            <div>Shipping: </div>
                            <div>${cart.shippingPrice}</div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <div className='summery-line'>
                        <div>Tax: </div>
                        <div>${cart.taxPrice}</div>
                    </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <div className='summery-line'>
                            <div><strong>Total:</strong></div>
                            <div><strong>${cart.totalPrice}</strong></div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <div className="d-grid pt-2">
                        <Button type="button" className={cart.cartItems.length === 0 ? "out-of-stock-bg" : "primary"} onClick={submitOrderHandler} disabled={cart.cartItems.length === 0}>Submit Order</Button>
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