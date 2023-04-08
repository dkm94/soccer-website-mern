/* eslint-disable no-unused-vars */
import React from 'react';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import defaultAvatar from '../../../images/avatar.png';
import { Typography, Grid, Button } from '@mui/material';
import './ArticleCard.css';

const Avatar = ({ avatar }) => {
  return (
    <Col xs={4} className="comment-avatar">
      <Image
        roundedCircle
        src={avatar ? avatar : defaultAvatar}
        style={{ border: '4px #c40808 solid' }}
      />
    </Col>
  );
};

const RedirectButton = styled(Button)({
  fontSize: 'inherit',
  width: 'fit-content',
  alignSelf: 'self-end',
  backgroundColor: '#BCC3CA',
  color: '#2c2f35',
  // border: '#2C2F35 1px solid',
  textTransform: 'unset',
  '&:hover': {
    backgroundColor: 'transparent'
  }
});

const CardHeader = styled(Card.Header)({
  textAlign: 'end',
  // backgroundColor: '#2c2f35',
  // color: ' #fff',
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
        <RedirectButton>Go to the article</RedirectButton>
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
