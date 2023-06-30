import { Box, Checkbox, Typography, Container, FormControlLabel } from '@mui/material';
import React from 'react';

const ActivateAccount = ({ setAccountValidated, accountValidated }) => {
  return (
    <Box>
      <Typography className="step-title" variant="h5" component={'h1'}>
        Create your account
      </Typography>
      <Container className="step-content">
        <Typography variant="body1">Check the box to activate your account</Typography>
        <FormControlLabel
          style={{ marginTop: '2rem' }}
          label="Activate my account"
          control={
            <Checkbox
              label="Activate my account"
              name="accountValidated"
              value={accountValidated}
              onChange={() => setAccountValidated(!accountValidated)}
            />
          }
        />
      </Container>
    </Box>
  );
};

export default ActivateAccount;
