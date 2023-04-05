import React from 'react';
import { Card, Col, Row, Image } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import defaultAvatar from '../../../images/avatar.png';
import { Typography, Grid, Button } from '@mui/material';
import './CommentCard.css';

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
  color: '#000',
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

const Content = ({ message, date }) => {
  return (
    <Col xs={8}>
      <TextContainer>
        <Typography variant="body1">{message}</Typography>
        <Typography variant="body2">{date}</Typography>
        <RedirectButton>Go to the article</RedirectButton>
      </TextContainer>
    </Col>
  );
};

const CommentCard = ({ message, firstName, lastName, avatar, date }) => {
  const getDate = new Date(date);
  const formattedDate = getDate?.toLocaleDateString('en-US');
  return (
    <Card>
      <CardHeader> {`${firstName} ${lastName}`} </CardHeader>
      <Row style={{ margin: '1rem 0px' }}>
        <Avatar avatar={avatar} />
        <Content message={message} date={formattedDate} />
      </Row>
    </Card>
  );
};

export default CommentCard;
