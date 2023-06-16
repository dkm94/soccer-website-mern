import React from 'react';
import { Box, useTheme } from '@mui/material';
import './MainContent.css';

const MainContent = ({ title, children, width }) => {
  const { palette } = useTheme();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: { width } }}>
      <div>
        <span className="mc-title">{title}</span>
      </div>

      <Box
        sx={{
          backgroundColor: palette.white.main,
          boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)',
          padding: '0 1rem 5rem 1rem'
        }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainContent;
