/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { Col } from 'react-bootstrap';
import './SideArticles.css';

import { getArticles } from '../../../services/queries/public_queries';
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
    queryFn: getArticles
  });
  console.log('🚀 ~ file: SideArticles.jsx:25 ~ SideArticles ~ articles:', articles);

  const { palette } = useTheme();

  let temp = articles?.slice(-5);

  return (
    <Col lg={4} className="comment-layout">
      <MainContent title={'Last articles'} width={'80%'}>
        <Box sx={{ background: palette?.white?.main }}>
          {isError && <Message error={error?.code} img={false} />}
          <div className="cmt-content">
            {isLoading && <ArticlesLoader />}
            {temp &&
              temp.map(({ id, title, caption, file, updatedAt }, i) => (
                <ArticleCard
                  key={id}
                  title={title}
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
