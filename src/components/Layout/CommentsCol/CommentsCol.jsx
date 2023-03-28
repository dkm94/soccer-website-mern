import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import './CommentsCol.css';

import { getRessources } from '../../../services/dummyapi_services';
import CommentCard from '../../Cards/CommentCard/CommentCard';
import { Typography } from '@mui/material';

const CommentsCol = () => {
  const [comments, setComments] = useState([]);

  const containerStyle = {
    background: '#fff',
    // float: "left"
    width: '80%'
  };

  useEffect(() => {
    async function getData() {
      await getRessources('comment').then((res) => setComments(res.data));
    }
    getData();
    return () => {
      console.log(comments);
    };
  }, []);

  let temp = comments.slice(-5);

  return (
    <Col lg={4} className="comment-layout">
      <div style={containerStyle}>
        <div className="cmt-title">
          <Typography variant="h2">Last comments</Typography>
        </div>
        <div className="cmt-content">
          {temp.map((comment, index) => (
            <CommentCard
              key={index}
              message={comment.message}
              firstName={comment.owner.firstName}
              lastName={comment.owner.lastName}
              avatar={comment.owner.picture}
              date={comment.publishDate}
            />
          ))}
        </div>
      </div>
    </Col>
  );
};

export default CommentsCol;
