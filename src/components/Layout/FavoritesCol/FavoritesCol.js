import React from 'react';
import { Col } from 'react-bootstrap';
import './FavoritesCol.css';

const FavoritesCol = () => {
  return (
    <Col lg ={2} >
      <div className='layout-cols'>Favorites</div>
    </Col>
  )
}

export default FavoritesCol;