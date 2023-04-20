/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Container } from '@mui/material';
import './Loader.css';

const Card = () => {
  return (
    <div className="wrapper">
      <Container id="cp-emblem" className="load" />
      <Container id="cp-name" className="load" />
      <Container id="cp-area_name" className="load" />
    </div>
  );
};

const CompetitionsLoader = () => {
  const cards = Array(13).fill(<Card />);
  return (
    <Box
      sx={{
        display: 'grid',
        rowGap: '3rem',
        columnGap: '1rem',
        gridTemplateColumns: 'repeat(auto-fit, minmax(10rem, 1fr))',
        width: '100%'
      }}>
      {cards}
    </Box>
  );
};

export default CompetitionsLoader;
