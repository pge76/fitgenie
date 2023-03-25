import React from "react";

import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function MainMenu() {
    return (
        <div>
            <Container>
                <Navbar collapseOnSelect expand="sm" className="justify-content-center">
                    <Nav>
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/exercises">
                            <Nav.Link>Exercises</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/plans">
                            <Nav.Link>Plans</Nav.Link>
                        </LinkContainer>
                        <Navbar.Text>
                        </Navbar.Text>
                    </Nav>
                </Navbar>
            </Container>
        </div >
    );
}