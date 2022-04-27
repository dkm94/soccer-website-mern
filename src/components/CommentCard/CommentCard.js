import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const CommentCard = ({ message, owner }) => {
  return (
    <Card style={{ width: '100%', marginTop: "0.5rem" }}>
        <Card.Header> {owner} </Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item>{message}</ListGroup.Item>
        </ListGroup>
    </Card>
  )
}

export default CommentCard