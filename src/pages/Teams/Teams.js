import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import MainCol from '../../components/Layout/MainCol/MainCol';
import './Teams.css';

const Teams = () => {
  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
        <MainCol/>
      </Row>
    </Container>
  )
}

export default Teams