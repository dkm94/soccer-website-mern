import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import "./Results.css";

const Results = ({ match }) => {

    const containerStyle = {
        marginTop: "1rem",
        borderRadius: "0"
    }

  return (
    <Card key={match?.id} className="text-center" style={containerStyle} >
        <Card.Header id="card-header-style" >{match?.competition.name}</Card.Header>
        <Card.Body>
        <Container>
            <Row className="justify-content-md-center">
            <Col xs={4} >
                <Card.Title>{match?.score.fullTime.homeTeam}</Card.Title>
                <Card.Title>{match?.homeTeam.name}</Card.Title>
            </Col>
            <Col xs={2}>
                <Card.Title><span>-</span></Card.Title>
            
            </Col>
            <Col xs={4}>
                <Card.Title>{match?.score.fullTime.awayTeam}</Card.Title>
                <Card.Title>{match?.awayTeam.name}</Card.Title>
            </Col>
            </Row>
        </Container>
        <Card.Text>
            {match?.group}
        </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{match?.status}</Card.Footer>
    </Card>
  )
}

export default Results