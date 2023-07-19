import axios from 'axios';
import React, { useState,useEffect } from'react';
import Products from '../components/Products/Products.jsx';
import "./HomePage.css";

const HomePage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const res = await axios.get('/products').then(res => setProducts(res.data));
        }

        getProducts();
        return () => {};
    },[]);

    return (
        <div className="App">
            <main>
                <h1>Products</h1>
                <div className="products">
                    <Products products={products}></Products>
                </div>
            </main>
        </div>
    )
}

export default HomePage;