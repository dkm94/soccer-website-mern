import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import './CommentsCol.css';

import { getRessources } from '../../../services/dummyapi_services';
import CommentCard from '../../Cards/CommentCard/CommentCard';
import { Box, Typography } from '@mui/material';

const CommentsCol = () => {
  const [comments, setComments] = useState([]);

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
      <Box
        sx={{ background: '#fff', width: '80%', boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)' }}>
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
      </Box>
    </Col>
  );
};

export default CommentsCol;
