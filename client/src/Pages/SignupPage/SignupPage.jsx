import React, { useState, useContext, useEffect } from "react";
import { Button, Card, Container, Form} from 'react-bootstrap'
import Title from '../../components/Title/Title';
import { Link, useLocation, useNavigate } from'react-router-dom';
import { store } from '../../context/store';
import axios from 'axios';
import { toast } from'react-toastify';
import { USER_SIGNIN } from '../../Reducers/Actions';
import { ToastErrorSettings } from '../../Services/ToastErrorSettings';


const SignupPage = () => {

  

  //states for user information
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();
  const {search} = useLocation();

  const redirectInURL = new URLSearchParams(search).get('redirect'); //Current locations URL
  const redirect = redirectInURL? redirectInURL : '/';

  const {state,dispatch: ctxDispatch} = useContext(store);
  const {userInfo} = state;



  useEffect(() => {
    userInfo && navigate(redirect); //If user is logged in redirect to redirect url
  
  },[navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    else {
      try {
        const {data} = await axios.post('/users/signup', {name, email, password});  
        ctxDispatch({type: USER_SIGNIN,payload: data});
        navigate(redirect || '/');
      } catch (error) {
          toast.error("Login error", ToastErrorSettings);
      }
    }
    setValidated(true);
  };

  return (
    <>
            <Title title="Sign In" ></Title>
            <h1 className="my-4">Sign Up</h1>
            <Card>
              <Card.Body>
              <Container className='small-container'>
                <Form noValidate validated={validated} onSubmit={submitHandler}>
                  <Form.Group className='mb-3' controlId='name'>
                          <Form.Label>Name</Form.Label>
                          <Form.Control className='form-input-bg' type='text' required placeholder='Enter your name' onChange={(e) => setName(e.target.value)}/>
                          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">Please enter your name.</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='email'>
                          <Form.Label>Email</Form.Label>
                          <Form.Control className='form-input-bg' type='email' required placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}/>
                          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">Please provide a valid email.</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='password'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control className='form-input-bg' type='password' required placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/>
                          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">Please provide a valid password.</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className='mb-3' controlId='confirm-password'>
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control className='form-input-bg' type='password' required pattern={password} placeholder='Confirm password' onChange={(e) => setConfirmPassword(e.target.value)}/>
                          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid">Please match passwords.</Form.Control.Feedback>
                      </Form.Group>
                      <div className='py-4 d-grid'>
                          <Button type="submit" variant="primary">Sign Up</Button>
                      </div>
                      <div className='py-2'>
                          Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign in</Link>
                      </div>
                </Form>
                </Container>
              </Card.Body>
            </Card>
    </>
  )
}

export default SignupPage