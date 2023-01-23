import React from 'react';
import { Card, ListGroup, Col, Row, Container, Image, Button } from 'react-bootstrap';
import avatar from "../../images/avatar.png";
import './CommentCard.css';

const Avatar = () => {

  const avatarStyle = {
    height: "3.5rem",
    width: "auto"
  };

  return(
    <Col xs={4} className="comment-avatar">
      <Image roundedCircle src={avatar} className="avatar-style" style={avatarStyle} />
    </Col>
  )
}

const Content = ({ message }) => {
  return(
    <Col  xs={8}>
      <ListGroup style={{ display: "flex", rowGap: "15px" }}>
        <span>{message}</span>
        <span>01/17/2022</span>
        <Button style={{ fontSize: "inherit", width: "fit-content", alignSelf: "self-end", backgroundColor: "#FFF", color: "#000", border: "#2C2F35 1px solid" }}>Aller à l'article</Button>
      </ListGroup>
      
  </Col>
  )
}

const CommentCard = ({ message, owner }) => {
  return (
    <Card style={{ width: '100%', marginTop: "0.5rem", borderRadius: "0px" }}>
        <Card.Header className='card-header-surcharge'> {owner} </Card.Header>
        <Row style={{ margin: "1rem 0px",  }} >
          <Avatar />
          <Content message={message} />
        </Row>
        
        {/* <ListGroup variant="flush">
            <ListGroup.Item className='list-item-surcharge' >{message}</ListGroup.Item>
        </ListGroup> */}
    </Card>
  )
}

export default CommentCard