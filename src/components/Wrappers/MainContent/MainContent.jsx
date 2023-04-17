import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import './MainContent.css';

const MainContent = ({ title, children, width }) => {
  const { palette } = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: { width } }}>
      <div>
        <Typography variant="h2" component="h3" className="mc-title">
          {title}
        </Typography>
      </div>

      <Box
        sx={{
          backgroundColor: palette.white.light,
          boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)',
          padding: '0 2rem 5rem 2rem'
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainContent;
