import React, { useContext } from 'react'
import { Button,Card} from "react-bootstrap"
import { Link } from "react-router-dom";
import Rating from '../Rating/Rating';
import { addToCartHandler } from '../../Services/AddToCart';
import { store } from "../../context/store";
import './Product.css'

const Product = ({product}) => {

  const {state,dispatch: ctxDispatch} = useContext(store);
  const { cart: { cartItems } } = state;


  return (
    <Card className="product-card">
      <Link to={`/product/${product.token}`}>
        <Card.Img variant="top" src={product.image } alt={product.title}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src="/imgs/Image_not_available.png";
                }} 
                className='card-image-home mt-0.5' /> 
      </Link>
        <Card.Body className='card-body-home'>
          <Link to={`/product/${product.token}`}> 
            <Card.Title className='text-shortner'>{product.title}</Card.Title>
          </Link>
          <Rating rating={product.rating.rate} numReviews={product.rating.count}></Rating>
          <Card.Text>{product.price}$</Card.Text>
            {product.countInStock === 0 ? (<Button variant="dark" disabled>Out of Stock</Button>): 
              (<Button className='btn-primary' onClick={() => addToCartHandler(product,cartItems,ctxDispatch)}>Add to cart</Button>)}
        </Card.Body>

    </Card>
  )
}

export default Product;
