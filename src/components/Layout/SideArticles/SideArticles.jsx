/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { Col } from 'react-bootstrap';
import './SideArticles.css';

import { getArticles } from '../../../services/queries/public_queries';
import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import { Box } from '@mui/material';
import MainContent from '../../Wrappers/MainContent/MainContent';
import { useQuery } from 'react-query';
import ArticlesLoader from '../../Loaders/Skeletons/Home/SideArticles/Cards';
import Message from '../../Screens/Message';

const SideArticles = () => {
  const {
    data: articles,
    error,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  let temp = articles?.slice(-5);

  return (
    <Col lg={4} className="comment-layout">
      <MainContent title={'Last articles'} width={'80%'}>
        <Box sx={{ background: '#fff' }}>
          {isError && <Message error={error} img={false} />}
          <div className="cmt-content">
            {isLoading && <ArticlesLoader />}
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
