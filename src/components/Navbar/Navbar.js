import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';

const Navigation = () => {
  return (
    <>
    <Navbar bg="light" variant="light">
      <Container>
      <Navbar.Brand href="#home">2LEFOOT</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/players">Players</Nav.Link>
        <Nav.Link href="/area">Area</Nav.Link>
        <Nav.Link href="/competition">Competition</Nav.Link>
        <Nav.Link href="/teams">Teams</Nav.Link>
        <Nav.Link href="/games">Games</Nav.Link>
        <Nav.Link href="/myfavorites">My Favorites</Nav.Link>
        <Nav.Link href="/auth" id='login-button' >Log in/Register</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
  </>
  )
}

export default Navigation;