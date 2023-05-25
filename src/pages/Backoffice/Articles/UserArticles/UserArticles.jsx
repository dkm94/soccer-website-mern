/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Typography, useTheme, Grid, Container, styled } from '@mui/material';
import { getArticlesByAuthor } from '../../../../services/queries/public_queries';
import { useQuery } from 'react-query';
import Article from '../../../News/Article';
import SelectArticles from '../../../../components/Select/Articles';
import UserArticlesSkeleton from '../../../../components/Loaders/Skeletons/UserArticles/UserArticlesSkeleton';
import Message from '../../../../components/Screens/Message';

// const Card = () => {
//   return <div>Card</div>;
// };

// const SelectWrapper = styled(Container)({
//   padding: '0 !important',
//   display: 'flex',
//   justifyContent: 'flex-end',
//   '& div': {
//     width: '15rem'
//   }
// });

const UserArticles = ({ drawerWidth, profileId, path }) => {
  const { palette } = useTheme();

  const {
    data: thisUserArticles,
    // error,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticlesByAuthor(profileId)
  });

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
        minHeight: '20rem',
        boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)'
      }}>
      <Grid>
        <Grid item>
          <Typography variant="h1" className="title-section">
            My articles
          </Typography>
        </Grid>
        <Grid container spacing={2} ml={0}>
          {isError && <Message error={'DEFAULT_ERROR'} img={true} />}
          {isLoading && <UserArticlesSkeleton />}
          {thisUserArticles?.map((article) => (
            <Article key={article.id} article={article} profileId={profileId} path={path} />
          ))}
          <Grid mt={8}>
            {thisUserArticles?.length === 0 && (
              <span style={{ fontSize: '1rem' }}>
                You can write your first article, <a href="/backoffice/articles/create">here</a>.
              </span>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserArticles;
