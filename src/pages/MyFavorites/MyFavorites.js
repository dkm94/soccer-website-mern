import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import './MyFavorites.css';

const MyFavorites = () => {
  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
       
      </Row>
    </Container>
  )
}

export default MyFavorites