/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Grid, InputLabel, Button, Typography, styled } from '@mui/material';
import CustomTexField from '../../../../../components/Inputs/TextField/CustomTexField';
import { useCreateMod } from '../../../../../services/mutations/Moderators/useCreateMod';

const SubmitButton = styled(Button)(({ theme }) => ({
  textTransform: 'unset',
  marginTop: '2rem',
  backgroundColor: theme.palette.black.dark
}));

const ErrorMessage = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main
}));

const AddMod = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [tempForm, setTempForm] = useState(null);

  const [error, setError] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const mutation = useCreateMod(
    setSuccessMessage,
    setOpenSuccess,
    setOpenError,
    setError,
    setTempForm,
    setEmail,
    setName,
    onClose
  );

  const addMod = (e) => {
    e.preventDefault();
    mutation.mutate({ email, name });
  };

  const helperText = (field) => error?.messages[field];
  const catchError = (field) => {
    if (error?.messages) {
      return field in error.messages;
    }
  };

  const { isSuccess, isLoading, isError } = mutation;

  return (
    <Box component="form" onSubmit={addMod}>
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
          {isLoading ? 'Saving...' : isSuccess ? successMessage : 'Save'}
        </SubmitButton>
      </Grid>
      {isError && <ErrorMessage>Request has failed, please try again</ErrorMessage>}
    </Box>
  );
};

export default AddMod;
