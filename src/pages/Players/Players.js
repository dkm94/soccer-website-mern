import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import './Players.css';

const Players = () => {
  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
      </Row>
    </Container>
  )
}

export default Players