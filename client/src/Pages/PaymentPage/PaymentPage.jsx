import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { store } from '../../context/store';
import { SAVE_PAYMENT_METHOD } from '../../Reducers/Actions'
import Title from '../../components/Title/Title';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { Button, Form } from 'react-bootstrap';

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
            <Form onSubmit={submitHandler}>
                <div className='mb-3'>
                    <Form.Check type='radio' id="PayPal" label="PayPal" value = 'PayPal' checked={paymentMethodName === 'PayPal'} onChange={e => setPaymentMethodName(e.target.value)}/>
                </div>
                <div className='mb-3'>
                    <Form.Check type='radio' id="Stripe" label="Stripe" value = 'Stripe' checked={paymentMethodName === 'Stripe'} onChange={e => setPaymentMethodName(e.target.value)}/>
                </div>
                <div className='mb-3'>
                    <Form.Check type='radio' id="Visa" label="Visa" value = 'Visa' checked={paymentMethodName === 'Visa'} onChange={e => setPaymentMethodName(e.target.value)}/>
                </div>
                <div className='mb-3'>
                    <Button variant="primary" type="submit" >Continue</Button>
                </div>
            </Form>
            </div>
        </>
    )
}

export default PaymentPage