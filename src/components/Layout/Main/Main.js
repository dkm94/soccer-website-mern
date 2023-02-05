import React from "react";
import Header from "../../Header/Header";
import CommentsCol from "../CommentsCol/CommentsCol";
import { Container, Row } from 'react-bootstrap';

const Layout = ({children, path}) => {
    return(
      <>
        <Header path={path} />
        <Container className='layout'>
          <Row>
            <CommentsCol />
            {children}
          </Row>
        </Container>
      </>
    )
  };

export default Layout;