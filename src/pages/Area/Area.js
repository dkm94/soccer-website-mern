import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import MainCol from '../../components/Layout/MainCol/MainCol';
import './Area.css';

const Area = () => {
  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
        <MainCol/>
      </Row>
    </Container>
  )
}

export default Area