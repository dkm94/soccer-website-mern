import { Container, Box } from '@mui/material';
import React from 'react';
import './Cards.css';

const ResultsLoader = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        rowGap: '3rem'
      }}>
      <div className="wrapper load-result-card__select">
        <Container id="load-result-card__select" className="load" />
      </div>
      <div className="wrapper">
        <Container id="header" className="load" />
        <Container id="main" className="load" />
      </div>
      <div className="wrapper">
        <Container id="header" className="load" />
        <Container id="main" className="load" />
      </div>
      <div className="wrapper">
        <Container id="header" className="load" />
        <Container id="main" className="load" />
      </div>
    </Box>
  );
};

export default ResultsLoader;
