import React from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import './Total.css'

const Total = ({cartItems, checkoutHandler}) => {
  return (
    <Card>
        <Card.Body>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h3>Subtotal:
                        (
                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
                            {' '}
                            items):
                            {' '} 
                            {cartItems.reduce((acc,item) => acc + item.price* item.quantity, 0).toFixed(2)} $</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                    <div className='d-grid'>
                        <Button type="button" variant="primary" onClick={checkoutHandler} disabled={cartItems.length === 0}>Checkout</Button>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </Card.Body>
    </Card>
  )
}

export default Total