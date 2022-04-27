import React from 'react';
import { Container, Row } from 'react-bootstrap';
import MainCol from '../../components/Layout/MainCol/MainCol';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import './Home.css';
import '../../App.css';


const Home = () => {

  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
        <MainCol/>
      </Row>
    </Container>
  )
}

export default Home;