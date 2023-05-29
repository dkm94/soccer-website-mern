/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Grid, Typography, InputLabel, styled, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material';
import CustomTexField from '../../../../components/Inputs/TextField/CustomTexField';
import { useCreateMod } from '../../../../services/mutations/Moderators/useCreateMod';

const SubmitButton = styled(Button)(({ theme }) => ({
  textTransform: 'unset',
  marginTop: '2rem',
  backgroundColor: theme.palette.black.dark
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Moderators = ({ drawerWidth }) => {
  const { palette } = useTheme();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [tempForm, setTempForm] = useState(null);

  const mutation = useCreateMod(
    setSuccessMessage,
    setOpenSuccess,
    setOpenError,
    setError,
    setTempForm,
    setEmail,
    setName
  );

  const submitPost = (e) => {
    e.preventDefault();
    mutation.mutate({ email, name });
  };

  const handleClose = (event) => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const helperText = (field) => error?.messages[field];
  const catchError = (field) => {
    if (error?.messages) {
      return field in error.messages;
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitPost}
      sx={{
        flexGrow: 1,
        padding: '2rem 4rem',
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: 'grid',
        gap: '2rem',
        mt: '2rem',
        backgroundColor: palette?.white.main,
        boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)'
      }}>
      <Grid container spacing={3}>
        <Grid item xs={12} pb={12}>
          <Typography variant="h1" className="title-section">
            Moderators management
          </Typography>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={2}>
            <InputLabel>Email</InputLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTexField
              required
              counter
              type="text"
              id="email"
              name="email"
              fullWidth
              size="small"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={catchError('email')}
              helperText={helperText('email')}
              inputProps={{
                maxLength: 90
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">@twolefoot.fr</Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel>Name</InputLabel>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTexField
              required
              counter
              type="text"
              id="name"
              name="name"
              fullWidth
              size="small"
              autoComplete="off"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={catchError('name')}
              helperText={helperText('name')}
              inputProps={{
                maxLength: 50
              }}
            />
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="flex-end">
          <SubmitButton type="submit" variant="contained">
            {mutation.isLoading ? 'Saving...' : 'New moderator'}
          </SubmitButton>
        </Grid>
      </Grid>
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
