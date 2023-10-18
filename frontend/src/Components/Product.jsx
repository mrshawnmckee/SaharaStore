import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top' />
        </Link>
        <Card.Body>
        <Link to={`/product/${product._id}`}>
            <Card.Title as='div' className='product-title'>     {/* Product-title has an ellipses added so that the cards do not go to two lines and change the height of the card */}
                <strong>{product.name}</strong>
            </Card.Title>
        </Link>
        <Card.Text as='div'>
            <Rating value={ product.rating } text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h3'>
            ${product.price}        {/*Not a template literal, it is just a dollar sign */}
        </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
