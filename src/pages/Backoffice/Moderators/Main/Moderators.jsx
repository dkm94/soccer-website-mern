/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material';
import ModsTable from '../Table/ModsTable';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Moderators = ({ drawerWidth }) => {
  const { palette } = useTheme();

  const [error, setError] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleClose = (event) => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: 'grid',
        minHeight: '40rem',
        gap: '2rem',
        mt: '2rem',
        backgroundColor: palette?.white.main,
        boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)'
      }}>
      <ModsTable />

      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%', color: '#FFF' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%', color: '#FFF' }}>
          {error?.error.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Moderators;
