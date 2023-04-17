/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Link,
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Typography,
  Container,
  IconButton,
  InputAdornment
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useMutation, useQuery } from 'react-query';
import { login } from '../../services/queries/auth_queries';
import { useTheme } from '@material-ui/core';
import './Login.css';

export default function SignIn() {
  const theme = useTheme();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: login,
    onError: (error, variables, context) => {
      setErrorMessage(error.message);
    },
    onSuccess: (data, variables, context) => {
      const auth = JSON.parse(localStorage.getItem('logged_in_status'));
      if (auth) {
        window.location.href = '/backoffice';
      }
    }
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
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
          background: theme.palette.white.light,
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
              // focused
            />
            <Typography variant="body1">{mutation.error && errorMessage}</Typography>
            <Button
              className="submit-btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
              {mutation.isLoading ? 'Connecting...' : 'SIGN IN'}
            </Button>
            <Grid container>
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
            </Grid>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
