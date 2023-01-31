import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getRessources } from '../../services/soccerapi_services';
import './Home.css';
import '../../App.css';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import Results from '../../components/Cards/Results/Results';


const Home = () => {

  const [matches, setMatches] = useState([]);

  const containerStyle = {
    padding: "1rem 3rem"
  }

  useEffect(() => {
    async function getDatas(){
      await getRessources("matches").then(res => setMatches(res));
    }
    getDatas();
      return () => {console.log(matches)}
  }, [])

  return (
    <Col lg={8} >
      <div className='layout-cols'>
        <MainContent title={"Today's games"}>
          <div style={containerStyle}>
          {matches?.map((match, i) => <Results match={match} />)}
          </div>
        </MainContent>
      </div>
    </Col>
  )
}

export default Home;