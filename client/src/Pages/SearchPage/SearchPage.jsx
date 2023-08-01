import React, { useEffect, useReducer, useState } from 'react'
import { SeacrhPageReducer, prices, ratings } from './searchUtils';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GET_FAIL, GET_REQUEST, GET_SUCCESS } from '../../Reducers/Actions';
import { GetURLSearchFilter } from '../../Services/GetURLSearchFilter';
import { Button, Card, Col, Container, Row} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Title from '../../components/Title/Title';
import "./SearchPage.css"
import Rating from '../../components/Rating/Rating';
import Loading from '../../components/Loading';
import MsgBox from '../../components/MsgBox';
import Product from '../../components/Product/Product';

const SearchPage = () => {

    const [{loading,error,products, pages,countProducts},dispatch] = useReducer(SeacrhPageReducer,{loading: true, error: ''});
    const {search} = useLocation();
    const navigate = useNavigate();

    //Get all the filter options backend requires from url
    const searchParams = new URLSearchParams(search);  

    const page = searchParams.get('page') || 1;
    const query = searchParams.get('query') || 'all';
    const category = searchParams.get('category') || 'all';
    const price = searchParams.get('price') || 'all';
    const rating = searchParams.get('rating') || 'all';
    const order = searchParams.get('order') || 'newest';

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const {data} = await axios.get('/products/categories');
                setCategories(data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        getCategories();
    },[]);

    useEffect(() => {
        const getFilteredProducts = async () => {
            dispatch({type: GET_REQUEST});
            try {
                const {data} = await axios.get('/products/search?' + GetURLSearchFilter(search,{},true)); 
                dispatch({type: GET_SUCCESS, payload: data});
            } catch (error) {
                dispatch({type: GET_FAIL, payload: error});
                toast.error(error.message);
            }
        };
        getFilteredProducts();
    },[query,category,price,rating,order,page]);



  return (
    <>
    <Title>Search</Title>
    <h1 className="my-4">Search Results</h1>
    <Row>
        <Col md={3}>
        <div className='align-height-div'></div>
        <Container className='px-3 py-3'>
                    <Card>
                        <Card.Body>
                            <h3 className='px-2 py-2'>Categories</h3>    
                            <ul class="px-2 list-unstyled">
                                <li>
                                    <Link className={"all" === category ? 'text-bold' : ''} to={GetURLSearchFilter(search,{category: "all"})}>Any</Link>
                                </li>
                                {categories.map(c => (
                                    <li key={c}>
                                        <Link className={c === category ? 'text-bold' : ''} to={GetURLSearchFilter(search,{category: c})}>{c}</Link>
                                    </li> 
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                </Container>
                <Container className='px-3 py-3'>
                    <Card>
                        <Card.Body>
                            <h3 className='px-2 py-2'>Price Range</h3>
                            <ul class="px-2 list-unstyled">
                                {prices.map(p => (
                                    <li key={p.name}>
                                        <Link className={p.value === price ? 'text-bold' : ''} to={GetURLSearchFilter(search,{price: p.value})}>{p.name}</Link>
                                    </li> 
                                ))}
                            </ul>
                        </Card.Body>                
                    </Card>
                </Container>
                <Container className='px-3 py-3'>
                    <Card>
                        <Card.Body>
                            <h3 className='px-2 py-2'>Rating</h3>
                            <ul class="px-2 list-unstyled">
                                {ratings.map(r => (
                                    <li key={r.name}>
                                        <Link to={GetURLSearchFilter(search,{rating: r.value})}><Rating rating={r.value} caption=" "></Rating></Link>
                                    </li> 
                                ))}
                            </ul>
                        </Card.Body>                 
                    </Card>
                </Container>
        </Col>
        <Col md={9}>
            {loading ? (<Loading/>) : error ? (<MsgBox variant="danger">{error.message}</MsgBox>) : (
                <>
                    <Row className='justify-content-between md-3'>
                        <Col md={6}>
                            <div className='py-3'>
                                {countProducts === 0 ? 'No' : countProducts} Results for:
                                {query !== 'all' && " " + query}
                                {category !== 'all' && ", " + category}
                                {price !== 'all' && ", " + price}
                                {rating !== 'all' && ",  " + rating} {" "}
                                {query !== 'all' || category !== 'all' || price !== 'all' || rating !== 'all' ? (
                                    <Button variant="light" onClick={() => navigate("/search")}><i className='fas fa-times-circle'></i></Button>
                                ) : null}
                            </div>
                        </Col>
                        <Col className='text-end py-3'>
                            Search By:{" "}
                            <select value={order} onChange={(e) => navigate(GetURLSearchFilter(search, {order: e.target.value}))}>
                                <option value ="newest">Latest Arrivals</option>
                                <option value ="lowest">Price: low to high</option>
                                <option value ="highest">Price high to low</option>
                                <option value ="toprated">Customer Reviews</option>
                            </select>
                        </Col>
                    </Row>
                    {products.length === 0 && (<MsgBox>No such products found!</MsgBox>)}
                    <Row>
                        {products.map((product) =>(
                            <Col sm={6} lg={4} md={4} className='mt-3' key={product._id}>
                                <Product product = {product}></Product>
                            </Col>
                        ))}
                    </Row>
                    <div className='py-5 page-btn-container'>
                        {[...Array(pages).keys()].map((p) =>(
                            <LinkContainer className='mx-1' to={{pathname: '/search' , search: GetURLSearchFilter(search, {page: p+1},true)}}>
                                <Button  className= {` ${ Number(page) === p+1 ? 'current-page' : ''} page-btn`}>{p+1}</Button>
                            </LinkContainer>
                        ))}
                    </div>
                </>
            )}
        </Col>
    </Row>
    </>
  )
}

export default SearchPage