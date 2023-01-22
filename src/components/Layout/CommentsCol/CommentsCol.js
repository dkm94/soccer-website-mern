import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import './CommentsCol.css';

import { getRessources } from '../../../services/dummyapi_services';
import CommentCard from '../../CommentCard/CommentCard';

const CommentsCol = () => {

  const [comments, setComments] = useState([]);

    useEffect(() => {
        async function getData(){
          await getRessources("comment").then(res => setComments(res.data));
        }
        getData();
        return () => {console.log(comments)}
    }, []);

  return (
    <Col lg={4} className="comment-layout" >
      <div className='layout-cols'>
        <h1>Last comments</h1>
        {
          comments.map((comment, index) => (
            <CommentCard 
            key={index}
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