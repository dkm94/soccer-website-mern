import React from 'react';
import { Card, ListGroup, Col, Row, Image, Button } from 'react-bootstrap';
import defaultAvatar from '../../../images/avatar.png';
import './CommentCard.css';

const Avatar = ({ avatar }) => {
  const avatarStyle = {
    height: '3.5rem',
    width: 'auto'
  };

  return (
    <Col xs={4} className="comment-avatar">
      <Image
        roundedCircle
        src={avatar ? avatar : defaultAvatar}
        className="avatar-style"
        style={avatarStyle}
      />
    </Col>
  );
};

const Content = ({ message, date }) => {
  return (
    <Col xs={8}>
      <ListGroup style={{ display: 'flex', rowGap: '15px' }}>
        <span>{message}</span>
        <span>{date}</span>
        <Button
          style={{
            fontSize: 'inherit',
            width: 'fit-content',
            alignSelf: 'self-end',
            backgroundColor: '#FFF',
            color: '#000',
            border: '#2C2F35 1px solid'
          }}
        >
          Go to the article
        </Button>
      </ListGroup>
    </Col>
  );
};

const CommentCard = ({ message, firstName, lastName, avatar, date }) => {
  let getDate = new Date(date);
  let formattedDate = getDate.toLocaleDateString('en-US');
  return (
    <Card style={{ width: '100%', marginTop: '1rem', borderRadius: '0px' }}>
      <Card.Header className="card-header-surcharge"> {`${firstName} ${lastName}`} </Card.Header>
      <Row style={{ margin: '1rem 0px' }}>
        <Avatar avatar={avatar} />
        <Content message={message} date={formattedDate} />
      </Row>

      {/* <ListGroup variant="flush">
            <ListGroup.Item className='list-item-surcharge' >{message}</ListGroup.Item>
        </ListGroup> */}
    </Card>
  );
};

export default CommentCard;
