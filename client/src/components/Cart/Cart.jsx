import React from 'react'
import MsgBox from '../MsgBox'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup } from 'react-bootstrap'

const Cart = ({cartItems, updateCartHandler, removeItemHandler}) => {
  return (
    <div>
        {cartItems.length === 0? (
          <MsgBox>Your cart is empty. {<Link to="/">Back to Home</Link>}</MsgBox>  
        ) : (
            <ListGroup>
                {
                  cartItems.map((item,i)  => (
                    <ListGroup.Item key={i}>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <img src={item.image} alt={item.name}  className='img-fluid rounded img-thumbnail'/>
                                <Link to={`/product/${item.token}`}>{item.name}</Link>
                            </Col>
                            <Col md={3}>
                                <Button onClick={() => {updateCartHandler(item,item.quantity -1)}} variant='light' disabled={item.quantity === 1}> 
                                    <i className="fas fa-minus-circle"></i>
                                </Button>
                                {' '}
                                <span>{item.quantity}</span>
                                {' '}
                                <Button onClick={() => {updateCartHandler(item,item.quantity +1)}} variant='light' disabled={item.quantity === item.countInStock}> 
                                    <i className="fas fa-plus-circle"></i>
                                </Button>
                                {' '}
                            </Col>
                            <Col md={3}>
                                <Button onClick={() => {removeItemHandler(item)}} variant='light'> 
                                    <i className="fas fa-trash"></i>
                                </Button>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                )
               )}
            </ListGroup>
        )}
    </div>
  )
}

export default Cart