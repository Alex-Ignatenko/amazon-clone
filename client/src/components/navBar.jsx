import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    return (
        <>
            <header className="App-header">
                <Navbar bg="dark" variant="dark">
                    <Link
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        Back
                    </Link>
                    <Container className="container">
                        <LinkContainer to="/">
                            <Navbar.Brand>
                                <img src="/imgs/amazonlogo.png" width={100} alt="AMZN" />
                            </Navbar.Brand>
                        </LinkContainer>

                        <nav className="d-flex mx-auto align-items-center">
                            <input type="text"></input>
                        </nav>

                        <Link to="/cart" className="nav-link me-4 ms-4">Cart</Link>

                    </Container>
                </Navbar>
            </header>
        </>
    );
};

export default NavBar;
