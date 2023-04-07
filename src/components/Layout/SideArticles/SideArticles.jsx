/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { Col } from 'react-bootstrap';
import './SideArticles.css';

import { getArticles } from '../../../services/queries/public_queries';
import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import { Box, Typography } from '@mui/material';
import MainContent from '../../Wrappers/MainContent/MainContent';
import { useQuery } from 'react-query';

const SideArticles = () => {
  const { data: articles, error, isError, isLoading } = useQuery(['articles'], getArticles);

  let temp = articles?.slice(-5);

  return (
    <Col lg={4} className="comment-layout">
      <MainContent title={'Last articles'} width={'80%'}>
        <Box sx={{ background: '#fff' }}>
          <div className="cmt-content">
            {isError && 'Error loading data'}
            {isLoading && 'Loading articles...'}
            {temp &&
              temp.map(({ id, title, author, createdAt }, i) => (
                <ArticleCard key={id} title={title} author={author} date={createdAt} />
              ))}
          </div>
        </Box>
      </MainContent>
    </Col>
  );
};

export default SideArticles;
