import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { getRessources } from '../../../services/soccerapi_services';
import './MainCol.css';

const MainCol = (props) => {
console.log("🚀 ~ file: MainCol.js ~ line 8 ~ MainCol ~ props", props)

  const path = window.location.pathname;

  const [areas, setAreas] = useState([]);
  const [competitions, setCompetitions] = useState([]);


  const [data, setData] = useState([]);

  useEffect(() => {
    async function getDatas(){
      if(path === '/area'){
        await getRessources("areas").then(res => setAreas(res));
      } else if(path === '/competition'){
        await getRessources("competitions").then(res => setCompetitions(res));
      } else return null;
    }
    getDatas();
  })
  

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