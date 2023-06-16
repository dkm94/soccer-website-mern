import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Button, Box } from '@mui/material';

const HomeSlideContent = ({ title, content }) => {
  const Title = styled(Typography)({
    fontSize: '3rem',
    fontWeight: '700',
    fontFamily: "'Adamina', serif"
  });

  const Description = styled(Typography)({
    fontSize: '1.5rem'
  });

  const RedirectionButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    border: 'none',
    textTransform: 'unset'
  }));

  return (
    <Box
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        height: '100%',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.50)',
        padding: '150px 200px'
      }}>
      <Title>{title}</Title>
      <Description>{content}</Description>
      <Box sx={{ marginTop: '1rem' }}>
        <RedirectionButton>Read the article</RedirectionButton>
      </Box>
    </Box>
  );
};

export default HomeSlideContent;
