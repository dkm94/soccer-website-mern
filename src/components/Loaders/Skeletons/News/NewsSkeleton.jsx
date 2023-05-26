/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid, Container } from '@mui/material';
import './NewsSkeleton.css';

const Card = () => {
  return (
    <Grid item xs={12} md={6} lg={4} className="wrapper">
      <Container className="load skeleton__news-content" />
      <Container className="load skeleton-text-100" />
      <Container className="load skeleton-text-100" />
      <Container className="load skeleton-text-100" />
    </Grid>
  );
};

const NewsSkeleton = () => {
  const cards = Array(6).fill(<Card />);
  return (
    <Grid container spacing={4} mt={2}>
      {cards}
    </Grid>
  );
};

export default NewsSkeleton;
