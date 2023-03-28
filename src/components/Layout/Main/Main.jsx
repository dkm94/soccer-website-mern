import React from 'react';
import Header from '../../Header/Header';
import CommentsCol from '../CommentsCol/CommentsCol';
import { Container, Row } from 'react-bootstrap';
import './Main.css';

const Layout = ({ children, path }) => {
  return (
    <>
      {path !== '/backoffice' ? <Header path={path} /> : null}
      <Container
        fluid
        className={`layout ${path === '/backoffice' && 'backoffice-bg'}`}
        style={{ minHeight: '100vh' }}>
        <Container>
          <Row>
            {path !== '/backoffice' && <CommentsCol />}
            {children}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Layout;
