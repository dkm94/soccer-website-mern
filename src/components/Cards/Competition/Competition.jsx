import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './Competitions.css';

const Competition = ({ competition }) => {
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

  let navigate = useNavigate();
  // const [season, setSeason] = useState(2022);

  return (
    <Col className="cpt-card-style">
      <Card
        style={{ borderRadius: '0' }}
        onClick={() => navigate(`/competitions/${competition?.id}/teams`)}>
        <Card.Img variant="top" style={{ padding: '1.3rem' }} src={competition?.emblem} />
        <CardBody>
          <Title>{competition?.name}</Title>
          <Subtitle>{competition?.area.name}</Subtitle>
        </CardBody>
      </Card>
    </Col>
  );
};

export default Competition;
