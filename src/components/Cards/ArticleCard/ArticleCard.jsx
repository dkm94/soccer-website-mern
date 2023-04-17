/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import { Typography, Grid, Button } from '@mui/material';
import './ArticleCard.css';

const RedirectButton = styled(Button)(({ theme }) => ({
  fontSize: 'inherit',
  width: 'fit-content',
  alignSelf: 'self-end',
  textTransform: 'unset',
  '&:hover': {
    backgroundColor: theme.palette.white.main,
    color: theme.palette.black.light
  }
}));

const CardHeader = styled(Card.Header)({
  textAlign: 'end',
  borderRadius: '0px',
  fontSize: '0.8rem'
});

const TextContainer = styled(Grid)({
  display: 'flex',
  rowGap: '0.4rem',
  flexDirection: 'column'
});

const Content = ({ title, date, author }) => {
  return (
    <Col xs={8}>
      <TextContainer>
        <Typography variant="body1">{title}</Typography>
        <Typography variant="body2">{author}</Typography>
        <Typography variant="body2">{date}</Typography>
        <RedirectButton sx={{ backgroundColor: 'black.light' }} variant="contained">
          Go to the article
        </RedirectButton>
      </TextContainer>
    </Col>
  );
};

const ArticleCard = ({ key, title, author, date }) => {
  const getDate = new Date(date);
  const formattedDate = getDate?.toLocaleDateString('en-US');
  return (
    <Card key={key}>
      <Row style={{ margin: '1rem 0px' }}>
        <Content title={title} date={formattedDate} author={author} />
      </Row>
    </Card>
  );
};

export default ArticleCard;
