import React from 'react';
import { Box, Container } from '@mui/material';
import './Cards.css';

const ArticlesLoader = () => {
  return (
    <Box sx={{ display: 'grid', rowGap: '3rem', padding: '1rem' }}>
      <div className="wrapper">
        <Container id="article-img" className="load"></Container>
        <Container id="article-title" className="load"></Container>
        <Container id="article-date" className="load"></Container>
      </div>
      <div className="wrapper">
        <Container id="article-img" className="load"></Container>
        <Container id="article-title" className="load"></Container>
        <Container id="article-date" className="load"></Container>
      </div>
      <div className="wrapper">
        <Container id="article-img" className="load"></Container>
        <Container id="article-title" className="load"></Container>
        <Container id="article-date" className="load"></Container>
      </div>
    </Box>
  );
};

export default ArticlesLoader;
