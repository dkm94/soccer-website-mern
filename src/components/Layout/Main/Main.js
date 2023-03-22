import React from "react";
import Header from "../../Header/Header";
import CommentsCol from "../CommentsCol/CommentsCol";
import { Container, Row } from 'react-bootstrap';

const Layout = ({children, path}) => {
    return(
      <>
        {path !== "/backoffice" ? <Header path={path} /> : null}
        <Container className='layout' style={{ minHeight: "100vh" }} >
          <Row>
            {path !== "/backoffice" && <CommentsCol />}
            {children}
          </Row>
        </Container>
      </>
    )
  };

export default Layout;