import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import './Competitions.css';

const Title = styled(Card.Title)(({ theme }) => ({
  textAlign: 'center',
  fontSize: '0.9rem',
  color: theme.palette.black.dark,
  fontFamily: "'Adamina', serif"
}));

const Subtitle = styled(Card.Title)(({ theme }) => ({
  textAlign: 'center',
  fontSize: 'unset',
  color: theme.palette.grey.dark
}));

const CardBody = styled(Card.Body)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'end'
});

const CardItem = styled(Card)({
  borderRadius: '5px',
  border: '1px solid #f2efef',
  // boxShadow: '5px 5px 0px -2px rgba(166,162,161,0.17)'
  boxShadow: '5px -7px 5px -2px rgba(166,162,161,0.17)'
});

const Competition = ({ competition }) => {
  return (
    <Col className="cpt-card-style">
      <CardItem>
        <Link
          to={`/competitions/${competition?.code}/matches`}
          style={{ height: '100%', textDecoration: 'none' }}
          reloadDocument>
          <Container
            style={{ height: 'inherit', display: 'flex', flexDirection: 'column', padding: '0' }}>
            <Card.Img variant="top" style={{ padding: '1.3rem' }} src={competition?.emblem} />
            <CardBody>
              <Title>{competition?.name}</Title>
              <Subtitle>{competition?.area.name}</Subtitle>
            </CardBody>
          </Container>
        </Link>
      </CardItem>
    </Col>
  );
};

export default Competition;
