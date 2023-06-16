import React from 'react';
import { Container, Grid } from '@mui/material';
import './UserArticlesSkeleton.css';

const Card = () => {
  return (
    <Grid item xs={12} md={6} lg={4} className="wrapper">
      <Container className="load skeleton-content" />
      <Container className="load skeleton-text-100" />
      <Container className="load skeleton-text-100" />
      <Container className="load skeleton-text-100" />
    </Grid>
  );
};

const UserArticlesSkeleton = () => {
  const cards = Array(6).fill(<Card />);
  return (
    <Grid container spacing={4} mt={4}>
      {cards}
    </Grid>
  );
};

export default UserArticlesSkeleton;
