import { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { toast } from "react-toastify";
import CheckoutSteps from '../Components/CheckoutSteps';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import  { clearCartItems } from '../slices/cartSlice';

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //Get cart state
    const cart = useSelector((state) => state.cart);

    useEffect(() => { 
        // Check for shiiping info and payment info, if not present, navigate to proper screen
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        } else if (!cart.paymentMethod) {
            navigate('/payment')
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address:</strong>
                        {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {cart.paymentMethod}
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {cart.cartItems.length === 0 ? (
                        <Message>Your cart is empty</Message>
                    ) : (
                        <ListGroup variant="flush">
                            {cart.cartItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name}
                                            fluid rounded />
                                        </Col>
                                        <Col>
                                            
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    )}
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>Column</Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
