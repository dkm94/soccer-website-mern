import React from "react";
import Header from "../../Header/Header";
import CommentsCol from "../CommentsCol/CommentsCol";
import { Container, Row } from 'react-bootstrap';

const Layout = ({children, path}) => {
    return(
      <>
        {path !== "/secret-login-page" && <Header path={path} />}
        <Container className='layout' style={{ minHeight: "100vh" }} >
          <Row>
            {path !== "/secret-login-page" && <CommentsCol />}
            {children}
          </Row>
        </Container>
      </>
    )
  };

export default Layout;