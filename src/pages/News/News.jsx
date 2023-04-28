import React from 'react';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
// import news from '../../seeds/news';
import { getArticles } from '../../services/queries/public_queries';
import { useQuery } from 'react-query';
import { Grid } from '@mui/material';
import Article from './Article';
import './News.css';

const News = () => {
  const containerStyle = {
    padding: '1rem 3rem'
  };

  const {
    data: articles
    // error,
    // isError,
    // isLoading
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  return (
    <div className="layout-cols">
      <MainContent title={'Latest articles'}>
        <div style={containerStyle}>
          <Grid></Grid>
          <Grid container spacing={2}>
            {articles?.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </Grid>
        </div>
      </MainContent>
    </div>
  );
};

export default News;
