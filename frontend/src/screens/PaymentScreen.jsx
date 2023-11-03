import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from "../Components/FormContainer";
import CheckoutSteps from "../Components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get cart state, and shipping address from the cart
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // if no shipping address in state, this will redirect to shipping screen
    useEffect(() => {
        if(!shippingAddress) {
            navigate('shipping');
        }
    }, [shippingAddress, navigate]) //since we use these in useeffect, we have to add them as dependencies

    // onsubmit go save info to state and go to /placeorder screen
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder')
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
    
      <Form onSubmit={ submitHandler }>
        <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                  type="radio"
                  className="my-2"
                  label="PayPal or Credit Card"
                  id="PayPal"
                  name="paymentMethod"
                  value='PayPal'
                  checked
                  onChange={(e) => setPaymentMethod(e.target.value)}
                
                ></Form.Check>
            </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
            Continue
        </Button>
      </Form>

    </FormContainer>
  )
}

export default PaymentScreen
