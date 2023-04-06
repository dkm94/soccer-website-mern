import React from 'react';
import { Box, Typography } from '@mui/material';
import './MainContent.css';

const MainContent = ({ title, children, width }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: { width } }}>
      <div>
        <Typography variant="h2" component="h3" className="mc-title">
          {title}
        </Typography>
      </div>

      <Box sx={{ backgroundColor: '#FFF', boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)' }}>
        {children}
      </Box>
    </Box>
  );
};

export default MainContent;
