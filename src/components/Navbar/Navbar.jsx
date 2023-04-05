import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './Navbar.css';

const navItems = [
  {
    id: 1,
    title: 'home',
    path: '/'
  },
  {
    id: 2,
    title: 'competitions',
    path: '/competitions'
  },
  {
    id: 3,
    title: 'match history',
    path: '/matchhistory'
  },
  {
    id: 4,
    title: 'news',
    path: '/news'
  }
];

const Navigation = () => {
  // const navigate = useNavigate();
  // const logOut = () => {
  //   console.log("déconnexion...")
  //   localStorage.removeItem("token")
  //   navigate('/');
  // }

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        className="nav-style"
        style={{ position: 'fixed', zIndex: 1000 }}>
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand href="/">
            <div className="logo-style">2LEFOOT</div>
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-center" id="responsive-navbar-nav">
            <Nav className="nav-items">
              {navItems?.map((item) => (
                <Nav.Link key={item.id} href={item?.path}>
                  {item?.title}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
