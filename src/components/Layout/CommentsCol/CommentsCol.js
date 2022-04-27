import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import './CommentsCol.css';

import { getRessources } from '../../../services/dummyapi_services';
import CommentCard from '../../CommentCard/CommentCard';

const CommentsCol = () => {

  const [comments, setComments] = useState([]);

    useEffect(() => {
        getRessources("comment").then(res => setComments(res.data));
        // console.log(comments);
    }, [comments]);

  return (
    <Col lg={4} >
      <div className='layout-cols'>
        <h1>Last comments</h1>
        {
          comments.map(comment => (
            <CommentCard 
              message={comment.message}
              owner={comment.owner.firstName}
            />
          ))
        }
      </div>
    </Col>
  )
}

export default CommentsCol