import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import './Teams.css';

const Teams = () => {
  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
      </Row>
    </Container>
  )
}

export default Teams