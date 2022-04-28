import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CommentsCol from '../../components/Layout/CommentsCol/CommentsCol';
import { getRessources } from '../../services/soccerapi_services';
import './Home.css';
import '../../App.css';


const Home = () => {

  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function getDatas(){
      await getRessources("matches").then(res => setMatches(res));
    }
    getDatas();
      return () => {console.log(matches)}
  }, [])

  return (
    <Container className='layout' >
      <Row>
        <CommentsCol />
        <Col lg={8} >
          <div className='layout-cols'>
            <h1>Today's games</h1>
            {matches.map(match => (
              <Card className="text-center" style={{ marginTop: "1rem" }} >
                <Card.Header>{match.competition.name}</Card.Header>
                <Card.Body>
                  <Container>
                    <Row className="justify-content-md-center">
                      <Col xs={4} >
                        <Card.Title>{match.score.fullTime.homeTeam}</Card.Title>
                        <Card.Title>{match.homeTeam.name}</Card.Title>
                      </Col>
                      <Col xs={2}>
                        <Card.Title><span>-</span></Card.Title>
                    
                      </Col>
                      <Col xs={4}>
                        <Card.Title>{match.score.fullTime.awayTeam}</Card.Title>
                        <Card.Title>{match.awayTeam.name}</Card.Title>
                      </Col>
                    </Row>
                  </Container>
                  <Card.Text>
                    {match.group}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">{match.status}</Card.Footer>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;