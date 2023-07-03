/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@material-ui/core';
import { useLogin } from '../../services/mutations/Authentication/useLogin';
import './Login.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn({ auth }) {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const mutation = useLogin(setSuccessMessage, setOpenSuccess, setOpenError, setError);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  const handleClose = (event) => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const helperText = (field) => {
    if (error?.field === field) {
      return error?.message;
    }
    if (error?.type === 'empty') {
      return error?.message;
    }
  };
  const catchError = (field) => {
    if (error?.type === 'empty') {
      return true;
    }
    if (error?.type === 'incorrect') {
      return error?.message?.includes(field);
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Box
        sx={{
          backgroundColor: theme.palette.white.main,
          marginTop: '4rem',
          borderRadius: '5px',
          minHeight: '80vh',
          width: '40em',
          padding: '3rem',
          boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)'
        }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: theme.palette.primary.light }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              color="secondary"
              onChange={(e) => setEmail(e.target.value)}
              error={catchError('email')}
              helperText={helperText('email')}
              autoFocus
            />
            <TextField
              value={password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              variant="outlined"
              color="secondary"
              error={catchError('password')}
              helperText={helperText('password')}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button
              className="submit-btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {mutation.isLoading ? 'Connecting...' : 'Sign in'}
            </Button>
            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color={theme.palette.secondary.dark}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color={theme.palette.secondary.dark}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
          <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="success" sx={{ width: '100%', color: '#FFF' }}>
              {successMessage}
            </Alert>
          </Snackbar>
          <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="error" sx={{ width: '100%', color: '#FFF' }}>
              Request has failed
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Container>
  );
}
