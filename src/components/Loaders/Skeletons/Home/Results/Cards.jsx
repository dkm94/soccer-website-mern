import { Container, Box } from '@mui/material';
import React from 'react';
import './Cards.css';

const Card = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        rowGap: '3rem'
      }}>
      <div className="wrapper">
        <Container id="header" className="load sidebar" />
        <Container id="main" className="load sidebar" />
      </div>
      <div className="wrapper">
        <Container id="header" className="load sidebar" />
        <Container id="main" className="load sidebar" />
      </div>
      <div className="wrapper">
        <Container id="header" className="load sidebar" />
        <Container id="main" className="load sidebar" />
      </div>
    </Box>
  );
};

export default Card;
