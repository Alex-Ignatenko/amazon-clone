import React, {useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { store } from '../../context/store';
import { SAVE_SHIPPING_ADDRESS } from '../../Reducers/Actions'
import Title from '../../components/Title/Title';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { Button, Card, Container, Form } from 'react-bootstrap';

const ShippingAddressPage = () => {
    
    const {state, dispatch: ctxDispatch} = useContext(store)
    //States for shipping address
    const {userInfo, cart: {shippingAddress}} = state;
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if(!userInfo) {
            navigate('signing?=redirect=/shipping');
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
        e.stopPropagation();
        }else{
            ctxDispatch({type: SAVE_SHIPPING_ADDRESS, payload: {fullName, address, city,postalCode,country}});
            navigate('/payment');
        }
        setValidated(true);     
    };

  return (
    <>
        <Title>Shipping Address</Title>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className='container small-container'>
            <h1 className="my-4">Shipping Address</h1>
            <Card>
                <Card.Body>
                    <Container>
                        <Form noValidate validated={validated} onSubmit={submitHandler}>
                        {/* Full Name Field */}
                        <Form.Group controlId="fullName" className='mb-3'>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control className='form-input-bg' type="text" placeholder="Enter your  Full Name" required value={fullName} onChange={e => setFullName(e.target.value)}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter your full name.</Form.Control.Feedback>
                        </Form.Group>

                        {/* Address Field */}
                        <Form.Group controlId="Address" className='mb-3'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control className='form-input-bg' type="text" placeholder="Enter Address" required value={address} onChange={e => setAddress(e.target.value)}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter your Address.</Form.Control.Feedback>
                        </Form.Group>

                        {/* City Field */}
                        <Form.Group controlId="City" className='mb-3'>
                            <Form.Label>City</Form.Label>
                            <Form.Control className='form-input-bg' type="text" placeholder="Enter City" required value={city} onChange={e => setCity(e.target.value)}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter your City.</Form.Control.Feedback>
                        </Form.Group>

                        {/* postal Code Field */}
                        <Form.Group controlId="postalCode" className='mb-3'>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control className='form-input-bg' type="text" placeholder="Enter Postal Code" required pattern='^[0-9]+$' value={postalCode} onChange={e => setPostalCode(e.target.value)}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter a valid  Postal Code.</Form.Control.Feedback>
                        </Form.Group>

                        {/* country Field */}
                        <Form.Group controlId="country" className='mb-3'>
                            <Form.Label>Country</Form.Label>
                            <Form.Control className='form-input-bg' type="text" placeholder="Enter Country" required value={country} onChange={e => setCountry(e.target.value)}/>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">Please enter your Country.</Form.Control.Feedback>
                        </Form.Group>
                        <div className='py-2 d-grid'>
                            <Button variant="primary" type="submit">Continue</Button>
                        </div>
                    </Form>
                </Container>
            </Card.Body>
            </Card>
        </div>
    </>
  )
}

export default ShippingAddressPage