import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import MainCol from '../../components/Layout/MainCol/MainCol';
import './Players.css';

const Players = () => {
  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
        <MainCol/>
      </Row>
    </Container>
  )
}

export default Players