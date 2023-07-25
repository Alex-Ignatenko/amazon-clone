import React, { useState, useContext, useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import Title from '../components/Title/Title';
import { Link, useLocation, useNavigate } from'react-router-dom';
import { store } from '../context/store';
import axios from 'axios';
import { toast } from'react-toastify';
import { USER_SIGNIN } from '../reducers/Actions';

const SigninPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInURL = new URLSearchParams(search).get('redirect');
  const redirect = redirectInURL? redirectInURL : '/';
  const {state,dispatch: ctxDispatch} = useContext(store);
  const {userInfo} = state;

  useEffect(() => {
    userInfo && navigate(redirect);

  },[navigate, redirect, userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post('/users/signin', {email, password});  
      ctxDispatch({type: USER_SIGNIN,payload: data});
      navigate(redirect || '/');
    } catch (error) {
        toast.error(error.message, {
            theme: "colored",
            hideProgressBar: true,
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          });
    }
  }
  return (
    <>
        <Container className='small-container'>
            <Title title="Sign In" ></Title>
            <h1 className="my-3">Sign In</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='mb-3' controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type='email' required placeholder='Enter your email' onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Form.Group className='mb-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' required placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <div className='mb-3'>
                    <Button type="submit" variant="primary">Sign In</Button>
                </div>
                <div className='mb-3'>
                    New Customer? <Link to={`/signup?redirect=${redirect}`}> Create an Account</Link>
                </div>
            </Form>
        </Container>
    </>
  )
}

export default SigninPage