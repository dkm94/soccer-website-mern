import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';

const Navigation = ({ token }) => {

  const navigate = useNavigate();
  const logOut = () => {
    console.log("déconnexion...")
    localStorage.removeItem("token")
    navigate('/');
  }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" className='nav-style' style={{ position: 'fixed', zIndex: 1000 }} bg="light" variant="light">
      <Container>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand href="/">2LEFOOT</Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/players">Players</Nav.Link>
          <Nav.Link href="/area">Areas</Nav.Link>
          <Nav.Link href="/competition">Competitions</Nav.Link>
          <Nav.Link href="/teams">Teams</Nav.Link>
          <Nav.Link href="/games">Matches</Nav.Link>
          <Nav.Link href="/myfavorites">My Favorites</Nav.Link>
          {!token ? <Nav.Link href="/auth" className='login-button' >Log in/Register</Nav.Link> : <Nav.Link onClick={logOut} href="/" className='login-button' >Log out</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
  )
}

export default Navigation;