import React, { useContext } from "react";
import { Navbar, Container, Badge } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { store } from "../../context/store";

const NavBar = () => {

    const navigate = useNavigate();
    const {state,dispatch: ctxDispatch} = useContext(store);
    const { cart, userInfo} = state;
    const {cartItems} = cart;

    const signOutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/");
     };

    return (
        <>
            <header className="App-header">
                <Navbar bg="dark" variant="dark">
                    <Link className="ms-5" onClick={() => {navigate(-1);}}>Back</Link>
                    <Container>
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <img src="/imgs/amazonlogo.png" width={100} alt="AMZN" />
                            </Navbar.Brand>
                        </LinkContainer>
                        <nav className="d-flex mx-auto align-items-center">
                            Search{" "}<input type="text" className="search-box"></input>
                        </nav>
                        <Link to="/cart" className="nav-link me-4 ms-4">
                            <i className="fas fa-shopping-cart fa-lg text-white"></i>
                            {cartItems.length > 0 && (
                                <Badge pill bg="danger">
                                    {" "}
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </Badge>
                            )}
                        </Link>
                        <Link to="/signin" className="nav-link me-4 ms-4">Sign In</Link>
                        <Link to="/signup" className="nav-link me-4 ms-4">Sign Up</Link>
                        <button className="nav-link me-4 ms-4" onClick={signOutHandler}>Sign out</button>
                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default NavBar;
