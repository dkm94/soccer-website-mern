import React from 'react';
import { Col, Card } from 'react-bootstrap';
import competitionSeeds from '../../../seeds/competitions';
import "./Competitions.css";

const Competition = ({ competition }) => {

  const titleStyle = {
    fontSize: "1rem",
    fontWeight: 600
  }

  return (
    <Col className='cpt-card-style'>
      <Card style={{ borderRadius: "0" }}>
        <Card.Img variant="top" style={{ height: "11rem", padding: "1.3rem"}} src={competition?.emblem} />
        <Card.Body>
          <Card.Title className='text-center' style={titleStyle}>{competition?.name}</Card.Title>
          <Card.Text className='text-center'>
            {competition?.area.name}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Competition