/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Container } from '@mui/material';
import './NewsSkeleton.css';

const Card = () => {
  return (
    <div className="wrapper">
      <Container className="load skeleton-content" />
      <Container className="load skeleton-text-100" />
      <Container className="load skeleton-text-100" />
      <Container className="load skeleton-text-100" />
    </div>
  );
};

const NewsSkeleton = () => {
  const cards = Array(6).fill(<Card />);
  return (
    <Box
      sx={{
        display: 'grid',
        rowGap: '3rem',
        columnGap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))',
        width: '100%',
        paddingTop: '2rem'
      }}>
      {cards}
    </Box>
  );
};

export default NewsSkeleton;
