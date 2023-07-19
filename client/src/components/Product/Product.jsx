import React from 'react'
import { Button,Card} from "react-bootstrap"
import { Link } from "react-router-dom";
import Rating from '../Rating/Rating';
import './Product.css'

const Product = ({product}) => {

  const addToCartHandler = (product) => {
    console.log(product);
  }

  const replaceImage = (error) => {
    error.target.src = "/imgs/Image_not_available.png";
  }
  
  return (
    <Card className="product-card">
      <Link to={`/product/${product.token}`}>
        <Card.Img variant="top" src={product.image } alt={product.title} onError={replaceImage} className='card-image-page' /> 
        <Card.Body className='card-body'>
          <Card.Title className='text-center'>{product.title}</Card.Title>
          <Rating rating={product.rating.rate} numReviews={product.rating.count}></Rating>
          <Card.Text>{product.price}$</Card.Text>
            {product.countInStock === 0 ? (<Button variant="danger" disabled>Out of Stock</Button>): 
              (<Button className='btn-primary' onClick={() => addToCartHandler(product)}>Add to cart</Button>)}
        </Card.Body>
      </Link>
    </Card>
  )
}

export default Product;
