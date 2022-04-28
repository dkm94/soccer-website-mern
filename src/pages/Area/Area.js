import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import './Area.css';

import { getRessources } from '../../services/soccerapi_services';

const Area = () => {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    async function getDatas(){
      await getRessources("areas").then(res => setAreas(res));
    }
    getDatas();
      return () => {console.log(areas)}
  }, [])
  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
        <Col xs={8} >
          <div className='layout-cols'>
            <h1>Today's games</h1>
            <Container>
              <Row>
                {areas.map(area => (
                  <Col xs={4} >
                    <Card key={area.id} className="text-center" style={{ marginTop: "1rem" }} >
                      <ListGroup variant="flush">
                        <ListGroup.Item>{area.name}</ListGroup.Item>
                        <Card.Header>Area: {area.parentArea}</Card.Header>
                      </ListGroup>
                    </Card>
                  </Col>
              ))}
              </Row>
            </Container>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Area