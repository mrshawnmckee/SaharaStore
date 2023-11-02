import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../Components/FormContainer';
import { saveShippingAddress } from '../slices/cartSlice';

//After unput, shipping address will be stored in cart state(ex, in localstorage>cart or redux>cart)
const ShippingScreen = () => {
    // Getting shipping details from the state
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;       //Getting shipping address from cart slice

    const [address, setAddress] = useState(shippingAddress?.address || ''); //setting shipping address as default if already entered, or an empty string
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const dispatch = useDispatch();
    const navigate = useNavigate();




    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country  }))
        navigate('/payment')            //Then navigate to the payment page
    }

  return (
    <FormContainer>
        <h1>Shipping</h1>

        <Form onSubmit={submitHandler}>

          <Form.Group controlId='address' className='my-2'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='city' className='my-2'>
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='postalCode' className='my-2'>
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='country' className='my-2'>
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='my-2'>
            Continue
          </Button>

        </Form>
    </FormContainer>
  )
}

export default ShippingScreen
