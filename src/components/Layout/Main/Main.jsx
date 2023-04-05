import React from 'react';
import Header from '../../Header/Header';
import CommentsCol from '../CommentsCol/CommentsCol';
import { Container, Row } from 'react-bootstrap';
import './Main.css';

const Layout = ({ children, path }) => {
  const showHeader = () => {
    if (path === '/secret-login' || path.includes('backoffice')) {
      return null;
    }
    return <Header path={path} />;
  };

  const showComments = () => {
    if (path === '/secret-login' || path.includes('backoffice')) {
      return null;
    }
    return <CommentsCol />;
  };

  return (
    <>
      {showHeader()}
      <Container
        fluid
        className={`layout ${path === '/backoffice' && 'backoffice-bg'}`}
        style={{ minHeight: '100vh' }}>
        <Container>
          <Row>
            {showComments()}
            {children}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Layout;
