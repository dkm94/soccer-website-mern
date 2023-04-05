import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './Competitions.css';

const Title = styled(Card.Title)({
  textAlign: 'center',
  fontSize: '1rem',
  fontWeight: 600
});

const Subtitle = styled(Card.Title)({
  textAlign: 'center',
  fontSize: 'unset'
});

const CardBody = styled(Card.Body)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end'
});

const Competition = ({ competition }) => {
  return (
    <Col className="cpt-card-style">
      <Card style={{ borderRadius: '0' }}>
        <Link to={`/competitions/${competition?.code}/matches`} reloadDocument>
          <Card.Img variant="top" style={{ padding: '1.3rem' }} src={competition?.emblem} />
          <CardBody>
            <Title>{competition?.name}</Title>
            <Subtitle>{competition?.area.name}</Subtitle>
          </CardBody>
        </Link>
      </Card>
    </Col>
  );
};

export default Competition;
