import { Grid, Container } from '@mui/material';
import React from 'react';

const NewsPageSkeleton = () => {
  return (
    <Grid container mt={4} p={4}>
      <Grid item xs={12} className="wrapper">
        <Container className="load skeleton-text-100" />
        <Container className="load skeleton-text-100" />

        <Container
          className="load skeleton-content"
          style={{ marginTop: '2rem', marginBottom: '2rem', height: '20rem' }}
        />

        <Container className="load skeleton-text-100" />
        <Container className="load skeleton-text-100" />
        <Container className="load skeleton-text-100" />

        <Container style={{ backgroundColor: 'transparent', height: '2rem' }} />

        <Container className="load skeleton-text-100" />
        <Container className="load skeleton-text-100" />
        <Container className="load skeleton-text-100" />
      </Grid>
    </Grid>
  );
};

export default NewsPageSkeleton;
