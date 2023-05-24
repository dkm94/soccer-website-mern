import React from 'react';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import { getArticles } from '../../services/queries/public_queries';
import { useQuery } from 'react-query';
import { Grid } from '@mui/material';
import Article from './Article';
import './News.css';
import Message from '../../components/Screens/Message';
import NewsSkeleton from '../../components/Loaders/Skeletons/News/NewsSkeleton';

const News = () => {
  const containerStyle = {
    padding: '1rem 3rem'
  };

  const {
    data: articles,
    // error,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  const onlineArticles = articles?.filter((filteredArticles) => filteredArticles.online == true);

  return (
    <div className="layout-cols">
      <MainContent title={'Latest articles'}>
        <div style={containerStyle}>
          {isError && <Message code={'DEFAULT_ERROR'} img={true} />}
          {isLoading && <NewsSkeleton />}
          {onlineArticles?.length === 0 && <Message code={'DATA_NOT_FOUND'} img={true} />}
          <Grid></Grid>
          <Grid container spacing={2}>
            {onlineArticles?.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </Grid>
        </div>
      </MainContent>
    </div>
  );
};

export default News;
