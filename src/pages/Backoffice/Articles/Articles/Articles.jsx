/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Select, useTheme, Grid, Container, styled } from '@mui/material';
import { getArticles } from '../../../../services/queries/public_queries';
import { useQuery } from 'react-query';
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

const Articles = ({ drawerWidth }) => {
  const { palette } = useTheme();

  const {
    data: articles,
    error,
    isError,
    isLoading
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  let formattedArticles = [];
  articles?.forEach((article) => {
    return formattedArticles.push({
      id: article?._id,
      author: article?.id_profile
    });
  });

  return (
    <Box
      component="form"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: 'grid',
        gap: '2rem',
        mt: '2rem',
        backgroundColor: palette?.white.main,
        borderRadius: '5px'
      }}>
      <Grid item>
        <SelectWrapper>
          <SelectArticles articles={articles} formattedArticles={formattedArticles} />
        </SelectWrapper>
      </Grid>
    </Box>
  );
};

export default Articles;
