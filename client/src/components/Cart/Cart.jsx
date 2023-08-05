import React from 'react'
import MsgBox from '../MsgBox'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup } from 'react-bootstrap'

const Cart = ({cartItems, updateCartHandler, removeItemHandler}) => {
  return (
    <div>
        {cartItems.length === 0? (
          <MsgBox className="pt-2" variant="not-found text-center">Your cart is empty. {<Link to="/">Back to Home</Link>}</MsgBox>  
        ) : (
            <ListGroup>
                {
                  cartItems.map((item,i)  => (
                    <ListGroup.Item key={i}>
                        <Row className="align-items-center">
                            <Col md={4}>
                                <div className='tumb-img-container'>
                                    <Link to={`/product/${item.token}`}><img src={item.image} alt={item.name}  className='img-fluid rounded tumb-img px-4 py-2'/></Link>
                                    <Link className="text-shortner px-4" to={`/product/${item.token}`}>{item.title}</Link>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className='px-2'>
                                    <Button onClick={() => {updateCartHandler(item,item.quantity -1)}} className={ item.quantity === 1 ? "out-of-stock-bg" : "primary"} disabled={item.quantity === 1}> 
                                        <i className="fas fa-minus-circle"></i>
                                    </Button>
                                    {' '}
                                    <span className='px-2'>{item.quantity}</span>
                                    {' '}
                                    <Button onClick={() => {updateCartHandler(item,item.quantity +1)}} className={item.quantity === item.countInStock ? "out-of-stock-bg" : "primary"} disabled={item.quantity === item.countInStock}> 
                                        <i className="fas fa-plus-circle"></i>
                                    </Button>
                                </div>
                                {' '}
                            </Col>
                            <Col md={2}>{item.price}$</Col>
                            <Col md={2}>
                                <Button onClick={() => {removeItemHandler(item)}} variant='danger'> 
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