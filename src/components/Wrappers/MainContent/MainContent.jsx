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
      <Box sx={{ backgroundColor: '#FFF' }}>{children}</Box>
    </Box>
  );
};

export default MainContent;
