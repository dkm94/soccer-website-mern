import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import './Competition.css';

import { getCount, getRessources } from '../../services/soccerapi_services';

const Competition = () => {
  const [competitions, setCompetitions] = useState([]);
  const [count, setCount] = useState(null);

  useEffect(() => {
    async function getDatas(){
    getRessources("competitions").then(res =>  setCompetitions(res));
  }
    getDatas();
      return () => {console.log(competitions)}
  }, [])

  useEffect(() => {
    async function getDatas(){
      getCount("competitions").then(res =>  setCount(res));
  }
    getDatas();
      return () => {console.log(count)}
  }, [])

  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
        <Col lg={8} >
          <div className='layout-cols'>
            <h1>All the competitions</h1>
            <span>Total competitions : {count}</span>
            {competitions?.map((competition, index) => (
              <Card key={index} className="text-center" style={{ marginTop: "1rem" }} >
              <Card.Header>{competition.name} / {competition.area.name}</Card.Header>
              <Card.Body>
                <Container>
                  <Row className="justify-content-md-center">
                    <Col >
                      <Card.Text>Current season: from {competition.currentSeason.startDate} to {competition.currentSeason.endDate}</Card.Text>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>)
            )}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Competition