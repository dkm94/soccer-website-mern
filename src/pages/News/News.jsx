import React from 'react';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import { getArticles } from '../../services/queries/public_queries';
import { useQuery } from 'react-query';
import { Grid, Container } from '@mui/material';
import Article from './Article';
import Message from '../../components/Screens/Message';
import NewsSkeleton from '../../components/Loaders/Skeletons/News/NewsSkeleton';
import './News.css';

const News = () => {
  const containerStyle = {
    padding: '1rem 3rem'
  };

  const {
    data: articles,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  const onlineArticles = articles?.filter((filteredArticles) => filteredArticles.online == true);

  return (
    <article>
      <Container className="news">
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
      </Container>
    </article>
  );
};

export default News;
