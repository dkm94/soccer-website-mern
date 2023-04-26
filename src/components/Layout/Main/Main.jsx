import React from 'react';
import Header from '../../Header/Header';
import SideArticles from '../SideArticles/SideArticles';
import { Container, Row } from 'react-bootstrap';
import './Main.css';

const Layout = ({ children, path }) => {
  const showHeader = () => {
    if (path === '/secret-login' || path.includes('backoffice')) {
      return null;
    }
    return <Header path={path} />;
  };

  const showLastArticles = () => {
    if (path === '/secret-login' || path === '/news' || path.includes('backoffice')) {
      return null;
    }
    return <SideArticles />;
  };

  return (
    <>
      {showHeader()}
      <Container
        fluid
        // className={`layout ${path === '/backoffice' && 'backoffice-bg'}`}
        className={`layout ${path.startsWith('/backoffice') && 'backoffice-bg'}`}
        style={{ minHeight: '100vh' }}>
        <Container>
          <Row>
            {showLastArticles()}
            {children}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Layout;
