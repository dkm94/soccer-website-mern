import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import status from './status';
import { Typography, styled } from '@mui/material';
import './Results.css';

const Score = styled(Typography)({
  fontSize: '2.5rem'
});

const CardContainer = styled(Card)({
  // maxWidth: '80%'
});

const Results = ({ match }) => {
  let htScore = match?.score?.fullTime?.home;
  let atScore = match?.score?.fullTime?.away;

  // const containerStyle = {
  //   marginTop: '1rem'
  //   // borderRadius: '0'
  // };

  const avatarStyle = {
    height: '3.5rem',
    width: 'auto'
  };

  const timeStyle = {
    fontSize: '20px',
    fontWeight: '600'
  };

  const handleTime = (date) => {
    let data = new Date(date);
    let hrs = data.getHours();
    let mins = data.getMinutes();
    if (hrs <= 9) hrs = '0' + hrs;
    if (mins < 10) mins = '0' + mins;
    const postTime = hrs + ':' + mins;
    return postTime;
  };

  const getFontWeight = (score) => {
    if (score === Math.max(htScore, atScore)) {
      return '600';
    } else if (htScore === 0 && atScore === 0 && match?.status === 'IN_PLAY') {
      return '300';
    } else if (htScore === 0 && atScore === 0 && match?.status === 'FINISHED') {
      return '600';
    } else {
      return '300';
    }
  };

  return (
    <CardContainer key={match?.id} className="text-center">
      <Card.Header id="card-header-style">
        {match?.competition?.name} - Matchday {match?.matchday}
      </Card.Header>
      <Card.Body style={{ padding: '2rem 1rem' }}>
        <Card.Title style={timeStyle}>{handleTime(match?.utcDate)}</Card.Title>

        <Container>
          <Row className="justify-content-md-center">
            <Col xs={4}>
              <Container>
                <Image src={match?.homeTeam?.crest} className="avatar-style" style={avatarStyle} />
              </Container>
              <Card.Title style={{ fontWeight: getFontWeight(htScore) }}>
                {match?.homeTeam?.shortName}
              </Card.Title>
            </Col>
            <Col xs={2} className="display-score">
              <Container>
                <Score variant="body2" style={{ fontWeight: getFontWeight(htScore) }}>
                  {match?.score?.fullTime?.home}
                </Score>
                <Score variant="body2">-</Score>
                <Score variant="body2" style={{ fontWeight: getFontWeight(atScore) }}>
                  {match?.score?.fullTime?.away}
                </Score>
              </Container>
            </Col>
            <Col xs={4}>
              <Container>
                <Image src={match?.awayTeam?.crest} className="avatar-style" style={avatarStyle} />
              </Container>
              <Card.Title style={{ fontWeight: getFontWeight(atScore) }}>
                {match?.awayTeam?.shortName}
              </Card.Title>
            </Col>
          </Row>
        </Container>
        <Card.Text>{!match?.group && null}</Card.Text>
      </Card.Body>
      <Card.Footer className={status[match?.status]?.style}>
        {status[match?.status]?.icon} {status[match?.status]?.title}
      </Card.Footer>
    </CardContainer>
  );
};

export default Results;
