import React, { useContext, useEffect, useReducer } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import {OrderSubmittedPageReducer, initState} from '../../Reducers//OrderSubmittedPageReducer';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from '../../Reducers/Actions.js';
import { store } from '../../context/store';
import  {toast}  from 'react-toastify';
import { ToastErrorSettings } from '../../Services/ToastErrorSettings';
import Loading from '../../components/Loading';
import MsgBox from '../../components/MsgBox';
import { Card, Col, ListGroup, Row } from 'react-bootstrap';
import axios from 'axios';
import Title from '../../components/Title/Title';

const OrderSubmittedPage = () => {

    const {state: { userInfo }} = useContext(store);

    const params = useParams();
    const { id: orderId } = params;
    const [{ loading, error, order }, dispatch] = useReducer(OrderSubmittedPageReducer, initState);

    const naviagte = useNavigate();

    useEffect(() => {

        if (!userInfo) {
            naviagte('/signin');
        }
        
        const getOrder = async () => {
            dispatch({ type: GET_REQUEST });
            try {
                const { data } = await axios.get(`/orders/${orderId}`, {
                    headers: { authorization: userInfo.token },
                  });
                  dispatch({ type: GET_SUCCESS, payload: data });
                
            } catch (error) {
                dispatch({ type: GET_FAIL, payload: error.message });
                toast.error("No such order found", ToastErrorSettings);
            }    
        };
        if (!order || (order._id && orderId !== order._id)){
            getOrder();
        }
    }, [naviagte, order, orderId, userInfo])


  return (
    <>
        {
        loading ? (
            <Loading />
          ) : error ? (
            <MsgBox variant="danger">{error}</MsgBox>
          ) : (
            <div>
              <Title title="Order" />
              <h1 className="my-4">Order Confirmation</h1>
              <h3 className=" mt-2 mb-4">Order Number: {order._id.substr(order._id.length - 10)}</h3>
              <Row>
                <Col md={8}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Shipping</Card.Title>
                      <Card.Text>
                        <strong>Name: </strong> {order.shippingAddress.fullName} <br />
                        <strong>Address: </strong> {order.shippingAddress.address},
                        {order.shippingAddress.city} ,{order.shippingAddress.country}
                      </Card.Text>
                      <div className='my-2'><strong >Delivery status: </strong></div>
                      {order.isDelivered ? (
                        <MsgBox variant="success">
                          Delivered at {order.deliveredAt}
                        </MsgBox>
                      ) : (
                        <MsgBox variant="danger">Not Delivered</MsgBox>
                      )}
                    </Card.Body>
                  </Card>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Payment</Card.Title>
                      <Card.Text>
                        <strong>Method: </strong> {order.paymentMethod}
                      </Card.Text>
                      <div className='my-2'><strong >Payment status: </strong></div>
                      {order.isPaid ? (
                        <MsgBox variant="success">
                          Paid at {order.paidAt}
                        </MsgBox>
                      ) : (
                        <MsgBox variant="danger">Not Paid</MsgBox>
                      )}
                    </Card.Body>
                  </Card>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Items</Card.Title>
                      <ListGroup variant="flush">
                        {order.orderItems.map((item) => (
                          <ListGroup.Item key={item._id}>
                            <Row className="align-items-center">
                              <Col md={6}>
                              <div className='tumb-img-container'>
                                <img src={item.image} alt={item.title} className="img-fluid rounded tumb-img px-2 py-2"></img>{' '}
                                <Link to={`/product/${item.token}`}>{item.title}</Link>
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
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Title>Order Summary</Card.Title>
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <div className='summery-line'>
                            <div>Items:</div>
                            <div>${order.itemsPrice.toFixed(2)}</div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className='summery-line'>
                            <div>Shipping:</div>
                            <div>${order.shippingPrice.toFixed(2)}</div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className='summery-line'>
                            <div>Tax:</div>
                            <div>${order.taxPrice.toFixed(2)}</div>
                          </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <div className='summery-line'>
                            <div><strong>Total:</strong></div>
                            <div><strong>${order.totalPrice.toFixed(2)}</strong></div>
                          </div>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
        )}
    </>
  )
}

export default OrderSubmittedPage