
import { Badge, Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import Title from "../Title/Title";
import Rating from "../Rating/Rating";
import  './ProductDetails.css';

function ProductDetails({product, addToCart}) {
    return (
        <>


    <div>
      <Row className="container-main-details">
        <Col sm={3} md={3} lg={4}>
        <Card className="img-card">
                <Card.Body className=" img-card-body">
                    <img src={product.image } alt={product.title}
                        onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/imgs/Image_not_available.png";
                        }}
                        className="product-img"
                    /> 
                </Card.Body>
            </Card>
        </Col>
        <Col sm={6} md={6} lg={7}>
            <Card className="desc-card">
                <Card.Body className="desc-card-body">
                    <ListGroup variant="flush" >
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
                        <ListGroup.Item>
                            Price: ${product.price}
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
                            {product.countInStock > 0 ? (
                                <ListGroup.Item>
                                    <div className='d-grid mb-3 mt-3 px-4'>
                                        <Button onClick={() => addToCart()} variant='primary'>Add to cart</Button>
                                    </div>
                                </ListGroup.Item>
                            ) : (
                                <ListGroup.Item>
                                    <div className='d-grid mb-3 mt-3 px-4'>
                                        <Button disabled variant='dark'>Out of Stock</Button>
                                    </div>
                                </ListGroup.Item>)
                            }
                    </ListGroup>
                </Card.Body>
            </Card>
        </Col>
        <Col sm={3} md={3} lg={1}>
        </Col>
      </Row>
    </div>
    </>
    )
}
export default ProductDetails;