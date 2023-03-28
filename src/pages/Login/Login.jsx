import * as React from 'react';
import {
  Box,
  Grid,
  Link,
  Button,
  Avatar,
  CssBaseline,
  TextField,
  Typography,
  Container
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { login } from '../../services/queries/auth_queries';
import { useTheme } from '@material-ui/core';
import './Login.css';

export default function SignIn() {
  const theme = useTheme();

  const { isLoading, isError, error, mutate } = useMutation(login, {
    retry: 3
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required.'),
    password: Yup.string().required('Password is required.')
  });

  const { register, handleSubmit, getValues } = useForm({
    resolver: yupResolver(validationSchema)
  });

  const { email, password } = getValues();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      await login(data);
    } catch (error) {
      console.error(error);
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
          background: '#FFF',
          marginTop: '4rem',
          borderRadius: '5px',
          minHeight: '80vh',
          width: 'fit-content',
          padding: '3rem'
        }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Avatar sx={{ m: 1, bgcolor: theme.palette.main }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              {...register('email', { required: true })}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              {...register('password', { required: true })}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              className="submit-btn"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                mutate({ email, password });
              }}>
              {isLoading ? 'Connecting...' : 'SIGN IN'}
            </Button>
            <div>{isError ? error.message : ''}</div>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
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
