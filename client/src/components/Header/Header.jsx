import React, { useContext } from "react";
import { Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { store } from "../../context/store";
import { USER_SIGNOUT } from "../../Reducers/Actions";
import SearchBox from "../SearchBox/SearchBox";



const Header = () => {

    const navigate = useNavigate();
    const {state,dispatch: ctxDispatch} = useContext(store);
    const { cart, userInfo} = state;
    const {cartItems} = cart;

    const signOutHandler = () => {
        ctxDispatch({type:USER_SIGNOUT})
        navigate("/");
     };

     const signInHandler = () => {
        navigate("/signin");
     };

     const signUpHandler = () => {
        navigate("/signup");
     };

    return (
        <>
            <Navbar className="header">
                    <Link className="ms-5" onClick={() => {navigate(-1);}}>Back</Link>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>
                            <img src="/imgs/amazonlogo.png" width={100} alt="AMZN" />
                        </Navbar.Brand>
                    </LinkContainer>
                        <nav className="d-flex mx-auto align-items-center header-text">
                            <SearchBox></SearchBox>
                            {/* <input type="text" className="search-box"></input> */}
                        </nav>
                        {userInfo? (
                                <NavDropdown className="me-4 header-text" title={"Welcome "+userInfo.name}>
                                    <NavDropdown.Item to="#signout" onClick={signOutHandler} className="dropdown-item">Sign out</NavDropdown.Item>     
                                </NavDropdown>
                                    ):(
                                <NavDropdown className="me-4 header-text" title="sign up">
                                        <NavDropdown.Item onClick={signInHandler} className="dropdown-item">Sign In</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item onClick={signUpHandler} className="dropdown-item">Sign Up</NavDropdown.Item>
                                </NavDropdown>      
                        )}
                </Container>
                <Link to="/cart" className="me-5">
                        <i className="fas fa-shopping-cart fa-2x text-white"></i>
                            {cartItems.length > 0 && (
                                <Badge pill bg="" style={{backgroundColor: '#f0c040'}} className="cart-badge">
                                    {" "}
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </Badge>
                            )}
                        <span>{" "}Cart</span>
                    </Link>
             </Navbar>
        </>
    );
};

export default Header;
