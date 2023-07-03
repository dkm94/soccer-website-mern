import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Button } from '@mui/material';
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

const Navigation = ({ auth }) => {
  // const navigate = useNavigate();

  const logOut = () => {
    console.log('déconnexion...');
    localStorage.removeItem('logged_in_status');
    localStorage.removeItem('profileId');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isMod');
    localStorage.removeItem('userId');
    localStorage.removeItem('accountValidated');
    localStorage.removeItem('token');
    console.log('Vous avez été déconnecté.');
    window.location.href = '/';
  };

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
                <Nav.Link
                  key={item.id}
                  href={item?.path}
                  id={window.location.pathname === item.path ? 'active' : ''}>
                  {item?.title}
                </Nav.Link>
              ))}
              {auth && (
                <>
                  <Nav.Link
                    key={5}
                    href={'/backoffice'}
                    id={window.location.pathname.startsWith('/backoffice') ? 'active' : ''}
                    onClick={() => localStorage.setItem('list-item-idx', 0)}>
                    Backoffice
                  </Nav.Link>
                  <Button size="small" onClick={logOut} id="logout-btn" key={6} variant="text">
                    Log out
                  </Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
