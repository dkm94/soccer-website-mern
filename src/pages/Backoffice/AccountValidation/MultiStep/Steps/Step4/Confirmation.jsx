import { Typography, Box, Container } from '@mui/material';
import React from 'react';

export const Confirmation = () => {
  return (
    <Box>
      <Typography className="step-title" variant="h5" component={'h1'}>
        Account created successfully
      </Typography>
      <Container className="step-content">
        <Typography textAlign={'center'} variant="body1">
          You can log in and create your first article !
        </Typography>
      </Container>
    </Box>
  );
};
