import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import './Total.css'

const Total = ({cartItems, checkoutHandler}) => {
  return (
    <Card>
        <Card.Body className='subtotal-card-body'>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <div className='subtotal-price-div'>
                        <h3>Subtotal:
                            (
                                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
                                {' '}
                                items):
                                {' '} 
                                {cartItems.reduce((acc,item) => acc + item.price* item.quantity, 0).toFixed(2)} $
                        </h3>
                    </div>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='d-grid pt-2'>
                        <Button type="button" variant="primary" onClick={checkoutHandler} disabled={cartItems.length === 0}>Checkout</Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
  )
}

export default Total