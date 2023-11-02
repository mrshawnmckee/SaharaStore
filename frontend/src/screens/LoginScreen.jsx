import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../Components/FormContainer';
import Loader from '../Components/Loader';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';


const LoginScreen = () => {''
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Logging in from teh login mutation
    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    // Looking to see if redirect(whan going to cart page) is there on shipping screen, so that it redirects to the correct page if user is logged in: 
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        // if there is user info in local storage, navigate to the redirect if user is logged in
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate])


    const submitHandler = (e) => {
        e.preventDefault()
        console.log('submit')
    }
    
  return (
    <FormContainer>
        <h1>Sign In</h1>

        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email' className="my-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type='email'
                    placeholder='email'
                    value={email}           //email in state
                    onChange={(e) => setEmail(e.target.value)}
                    >

                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className="my-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    placeholder='password'
                    value={password}           //password in state
                    onChange={(e) => setPassword(e.target.value)}
                    >

                </Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-2'>
                Sign In
            </Button>
        </Form>
        <Row className='py-3'>
            <Col>
                New Customer? <Link to='/register'>Register</Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen
