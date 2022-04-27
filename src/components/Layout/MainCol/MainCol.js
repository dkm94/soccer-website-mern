import React from 'react';
import { Col } from 'react-bootstrap';
import './MainCol.css';

const MainCol = () => {

  const path = window.location.pathname;

  const displayMainTitle = (path) => {
    switch (path) {
      case "/match":
        return "Search a game";
      case "/players":
        return "Search a player";
      case "/area":
        return "Search an aera";
      case "/competition":
        return "Search a competition";
      case "/teams":
        return "Search a team";
      case "/myfavorites":
        return "My favorite content";
      default:
        return "Today's games";
    }
  }

  return (
    <Col lg={8} >
      <div className='layout-cols'>
        <h1>{displayMainTitle(path)}</h1>
      </div>
    </Col>
  )
}

export default MainCol;