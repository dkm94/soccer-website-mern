import React from 'react';
import { Box } from '@mui/material';
import './LoaderAnimation.css';

const LoaderAnimation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '5rem'
      }}>
      <div className="loader loader5">
        <span></span>
        <span></span>
      </div>
    </Box>
  );
};

export default LoaderAnimation;
