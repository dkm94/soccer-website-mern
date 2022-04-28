import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';
import './CommentCard.css';

const CommentCard = ({ message, owner }) => {
  return (
    <Card style={{ width: '100%', marginTop: "0.5rem" }}>
        <Card.Header className='card-header-surcharge'> {owner} </Card.Header>
        <ListGroup variant="flush">
            <ListGroup.Item className='list-item-surcharge' >{message}</ListGroup.Item>
        </ListGroup>
    </Card>
  )
}

export default CommentCard