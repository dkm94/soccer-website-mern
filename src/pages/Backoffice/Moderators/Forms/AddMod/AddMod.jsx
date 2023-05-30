import React, { useState } from 'react';
import { Box, Grid, InputLabel, Button, Typography, styled } from '@mui/material';
import CustomTexField from '../../../../../components/Inputs/TextField/CustomTexField';

const SubmitButton = styled(Button)(({ theme }) => ({
  textTransform: 'unset',
  marginTop: '2rem',
  backgroundColor: theme.palette.black.dark
}));

const AddMod = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

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
          {mutation.isLoading ? 'Saving...' : 'New moderator'}
        </SubmitButton>
      </Grid>
    </Box>
  );
};

export default AddMod;
