
import { Badge, Button, Col, ListGroup, Row } from "react-bootstrap";
import Title from "../Title/Title";
import Rating from "../Rating/Rating";

function ProductDescription({product, addToCart}) {
    return (
        <ListGroup>
            <ListGroup.Item>
                <Title title={product.title} />
                <h1>{product.title}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
                <Rating
                    rating={product.rating.rate}
                    numReviews={product.rating.count}>
                </Rating>
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
                Description: <p className='lead'>{product.description}</p>
            </ListGroup.Item>
            <ListGroup.Item>
                 <Row>
                    <Col>Status: 
                        <span className="px-3">
                            {product.countInStock > 0 ? <Badge bg='success'>In Stock</Badge> : <Badge bg='danger'>Not in Stock</Badge> } 
                        </span> 
                    </Col>
                </Row>
            </ListGroup.Item>
                {product.countInStock > 0 && (
                    <ListGroup.Item>
                        <div className='d-grid mb-3 mt-3 px-4'>
                            <Button onClick={() => addToCart()} variant='primary'>Add to cart</Button>
                        </div>
            </ListGroup.Item>)}
        </ListGroup>
    )
}
export default ProductDescription;