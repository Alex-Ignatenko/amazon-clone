import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { store } from '../../context/store';
import { SAVE_PAYMENT_METHOD } from '../../Reducers/Actions'
import Title from '../../components/Title/Title';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { Button, Card, Form } from 'react-bootstrap';
import './PaymentPage.css'

const PaymentPage = () => {

    const {state, dispatch: ctxDispatch} = useContext(store)
    const {cart: {shippingAddress, paymentMethod}} = state;
    const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || 'PayPal')

    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({type: SAVE_PAYMENT_METHOD,payload: paymentMethodName})
        navigate('/placeorder')
    };

    useEffect(() => {
        if(!shippingAddress.address ){
            navigate('/shipping');
        }      
    },[]);

    return (
        <>
            <Title>Payment</Title>
            <CheckoutSteps step1 step2 step3/>
            <div className='container small-container'>
            <h1 className="my-4">Payment Method</h1>
            <Card>
                <Card.Body>
                    <Form className='px-3 pt-3' onSubmit={submitHandler}>
                    <div className={paymentMethodName === 'PayPal' ? 'active-checkbox' : 'inactive-checkbox'}>
                        <Form.Check type='radio' id="PayPal" label="PayPal" value = 'PayPal' checked={paymentMethodName === 'PayPal'}  onChange={e => setPaymentMethodName(e.target.value)}/>
                    </div>
                    <div className={paymentMethodName === 'Stripe' ? 'active-checkbox' : 'inactive-checkbox'}>
                        <Form.Check type='radio' id="Stripe" label="Stripe" value = 'Stripe' checked={paymentMethodName === 'Stripe'} onChange={e => setPaymentMethodName(e.target.value)}/>
                    </div>
                    <div className={paymentMethodName === 'Visa' ? 'active-checkbox' : 'inactive-checkbox'}>
                        <Form.Check  type='radio' id="Visa" label="Visa" value = 'Visa' checked={paymentMethodName === 'Visa'} onChange={e => setPaymentMethodName(e.target.value)}/>
                    </div>
                    <div className='py-4 d-grid'>
                        <Button variant="primary" type="submit" >Continue</Button>
                    </div>
                    </Form>
                </Card.Body>
            </Card>
            </div>
        </>
    )
}

export default PaymentPage