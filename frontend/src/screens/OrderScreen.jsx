import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../Components/Message';
import Loader from '../Components/Loader';
import { useGetOrderDetailsQuery } from '../slices/orderApiSlice'; //used to get the data rom DB

const OrderScreen = () => {
    // Getting the id from the URL with use params, but renaming id to orderId
    const { id: orderId } = useParams();

    const { 
        data: order, 
        refetch, 
        isLoading, 
        error 
    } = useGetOrderDetailsQuery(orderId);       

    // console.log(order)

  return  isLoading ? (
    <Loader />
    ) : error ? (
    <Message variant='danger' />
    ) : (
      <>
        <h1>Order {order._id}</h1>
      </>
    );
  
}

export default OrderScreen
