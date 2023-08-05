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
                <LinkContainer className="ms-5" to="/">
                        <Navbar.Brand>
                            <img src="/imgs/amazonlogo.png" width={125} alt="AMZN" />
                        </Navbar.Brand>
                </LinkContainer>  
                <Container>
                        <nav className="d-flex mx-auto align-items-center">
                            <SearchBox></SearchBox>
                        </nav>
                        <i className="fas fa-solid fa-user fa-2x text-white px-2"/>
                        {userInfo? (
                                <NavDropdown className="me-4 header-text" title={"Welcome "+userInfo.name}>
                                    <NavDropdown.Item to="#signout" onClick={signOutHandler} className="dropdown-item"><i className="fas fa-solid fa-sign-out-alt px-2"/>Sign out</NavDropdown.Item>     
                                </NavDropdown>
                                    ):(
                                <NavDropdown className="me-4 header-text" title="Account">
                                        <NavDropdown.Item onClick={signInHandler} className="dropdown-item"><i className="fas fa-solid fa-sign-in-alt  px-2"/>Sign In</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item onClick={signUpHandler} className="dropdown-item"><i className="fas fa-solid fa-user-plus px-2"/>Sign Up</NavDropdown.Item>
                                </NavDropdown>      
                        )}
                </Container>
                <Link to="/cart" className="me-5">
                        <i className="fas fa-shopping-cart fa-2x text-white"/>
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
