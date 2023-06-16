/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { Col } from 'react-bootstrap';
import './SideArticles.css';

import { getLastArticles } from '../../../services/queries/public_queries';
import ArticleCard from '../../Cards/ArticleCard/ArticleCard';
import { Box, useTheme } from '@mui/material';
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
    queryFn: getLastArticles
  });

  const { palette } = useTheme();

  return (
    <Col lg={4} className="comment-layout">
      <MainContent title={'Last articles'} width={'80%'}>
        <Box sx={{ background: palette?.white?.main }}>
          {isError && <Message error={error?.code} img={false} />}
          <div className="cmt-content">
            {articles?.length === 0 && <span>{"There's no content to load yet."}</span>}
            {isLoading && <ArticlesLoader />}
            {articles &&
              articles.map(({ _id, title, topic, caption, file, updatedAt }, i) => (
                <ArticleCard
                  id={_id}
                  key={_id}
                  title={title}
                  topic={topic}
                  file={file}
                  caption={caption}
                  date={updatedAt}
                />
              ))}
          </div>
        </Box>
      </MainContent>
    </Col>
  );
};

export default SideArticles;
