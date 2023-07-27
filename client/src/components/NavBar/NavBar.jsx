import React, { useContext } from "react";
import { Navbar, Container, Badge, NavDropdown } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { store } from "../../context/store";
import { USER_SIGNOUT } from "../../Reducers/Actions";



const NavBar = () => {

    const navigate = useNavigate();
    const {state,dispatch: ctxDispatch} = useContext(store);
    const { cart, userInfo} = state;
    const {cartItems} = cart;

    const signOutHandler = () => {
        ctxDispatch({type:USER_SIGNOUT})
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
                        <nav className="d-flex mx-auto align-items-center header-text">
                            Search{" "}<input type="text" className="search-box"></input>
                        </nav>
                        <Link to="/cart" className="nav-link me-4 ms-4">
                            <i className="fas fa-shopping-cart fa-lg text-white"></i>
                            {cartItems.length > 0 && (
                                <Badge pill bg="" style={{backgroundColor: '#ddad2b'}}>
                                    {" "}
                                    {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                </Badge>
                            )}
                            <span className=" header-text">{" "}Cart</span>
                        </Link>
                        {userInfo? (
                            <NavDropdown className="me-4 header-text" title={userInfo.name}>
                               <Link to="#signout" onClick={signOutHandler} className="dropdown-item">Sign out</Link>     
                            </NavDropdown>
                        ):(
                            <NavDropdown className="me-4 header-text" title="sign up">
                                <Link to="/signin" className="dropdown-item">Sign in</Link>
                                <NavDropdown.Divider/>
                                <Link to="/signup" className="dropdown-item">Sign up</Link>
                            </NavDropdown>
                            
                        )}
                    </Container>

                </Navbar>
            </header>
        </>
    );
};

export default NavBar;
