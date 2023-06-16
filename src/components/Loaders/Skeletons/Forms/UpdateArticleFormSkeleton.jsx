import { Box, Grid, Container } from '@mui/material';
import React from 'react';

const UpdateArticleFormSkeleton = () => {
  return (
    <div className="wrapper" style={{ marginTop: '3rem' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={2}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Box sx={{ width: 150 }}>
            <Container className="load skeleton-text-100" />
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={10} style={{ display: 'flex', flexDirection: 'row' }}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Container className="load skeleton-text-100" />
        </Grid>
        <Grid item xs={12} sm={10}>
          <Container className="load skeleton-content" />
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateArticleFormSkeleton;
