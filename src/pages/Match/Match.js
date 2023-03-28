import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Match.css';

import { getMatches } from '../../services/soccerapi_services';

const Match = () => {
  const [games, setGames] = useState([]);
  const [selectedDateFrom, setSelectedDateFrom] = useState(null);
  const [selectedDateTo, setSelectedDateTo] = useState(null);

  const searchMatches = (from, to) => {
    async function getDatas() {
      await getMatches('matches', from, to).then((res) => setGames(res));
    }
    return getDatas();
  };

  // Date format
  const dateFrom = selectedDateFrom?.toLocaleDateString('en-CA');
  const dateTo = selectedDateTo?.toLocaleDateString('en-CA');

  console.log(games);

  return (
    <Col lg={8}>
      <div className="layout-cols">
        <h1>Search</h1>
        <Container>
          <Row>
            <Col>
              <DatePicker
                selected={selectedDateFrom}
                onChange={(date) => setSelectedDateFrom(date)}
                placeholderText={'From'}
                filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0} // weekends cancel
                showYearDropdown // year show and scrolldown alos
                scrollableYearDropdown
              />
            </Col>
            <Col>
              <DatePicker
                selected={selectedDateTo}
                onChange={(date) => setSelectedDateTo(date)}
                placeholderText={'To'}
                filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0} // weekends cancel
                showYearDropdown // year show and scrolldown alos
                scrollableYearDropdown
              />
            </Col>
            <Col>
              <Button onClick={() => searchMatches(dateFrom, dateTo)}>Search</Button>
            </Col>
          </Row>
        </Container>
        {games.map((match) => (
          <Card className="text-center" style={{ marginTop: '1rem' }}>
            <Card.Header>
              {match.competition.name} / {match.competition.area.name}
            </Card.Header>
            <Card.Body>
              <Container>
                <Row>
                  <Col>
                    <Card.Text>{match.group}</Card.Text>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col xs={4}>
                    <Card.Title>{match.score.fullTime.homeTeam}</Card.Title>
                    <Card.Title>{match.homeTeam.name}</Card.Title>
                  </Col>
                  <Col xs={2}>
                    <Card.Title>
                      <span>-</span>
                    </Card.Title>
                  </Col>
                  <Col xs={4}>
                    <Card.Title>{match.score.fullTime.awayTeam}</Card.Title>
                    <Card.Title>{match.awayTeam.name}</Card.Title>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      Half-time score: {match.score.halfTime.homeTeam} -{' '}
                      {match.score.halfTime.awayTeam}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      Full-time score: {match.score.fullTime.homeTeam} -{' '}
                      {match.score.fullTime.awayTeam}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      {!match.score.extraTime.homeTeam && !match.score.extraTime.awayTeam
                        ? null
                        : `Extra-time score: ${match.score.extraTime.homeTeam} - ${match.score.extraTime.awayTeam}`}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>{match.group}</Card.Text>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
            <Card.Footer className="text-muted">{match.status}</Card.Footer>
          </Card>
        ))}
      </div>
    </Col>
  );
};

export default Match;
