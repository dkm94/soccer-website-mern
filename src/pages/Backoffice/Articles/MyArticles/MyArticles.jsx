/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, useTheme, Grid, Container, styled } from '@mui/material';
import { getArticlesByAuthor } from '../../../../services/queries/public_queries';
import { useQuery } from 'react-query';
import Article from '../../../News/Article';
import SelectArticles from '../../../../components/Select/Articles';

const Card = () => {
  return <div>Card</div>;
};

const SelectWrapper = styled(Container)({
  padding: '0 !important',
  display: 'flex',
  justifyContent: 'flex-end',
  '& div': {
    width: '15rem'
  }
});

const MyArticles = ({ drawerWidth, profileId }) => {
  const { palette } = useTheme();

  const {
    data: thisUserArticles,
    error,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticlesByAuthor(profileId)
  });

  // let formattedArticles = [];
  // articles?.forEach((article) => {
  //   return formattedArticles.push({
  //     id: article?._id,
  //     author: article?.id_profile
  //   });
  // });

  return (
    <Box
      component="form"
      sx={{
        flexGrow: 1,
        padding: '2rem 4rem',
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: 'grid',
        gap: '2rem',
        mt: '2rem',
        backgroundColor: palette?.white.main,
        borderRadius: '5px'
      }}>
      <Grid>
        <Grid item>
          <Typography variant="h1" className="title-section">
            My articles
          </Typography>
        </Grid>
        <Grid container spacing={2}>
          {thisUserArticles?.map((article) => (
            <Article key={article.id} article={article} profileId={profileId} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyArticles;
