import React from 'react';
import { createPortal } from 'react-dom';
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  FormControlLabel,
  Collapse,
  Button,
  Box,
  InputAdornment,
  IconButton,
  styled
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ModalComponent from '../../../../components/Modal/ModalComponent';

const SubmitButton = styled(Button)(({ theme }) => ({
  // marginTop: '2rem',
  backgroundColor: theme.palette.black.dark,
  width: 'fit-content',
  textTransform: 'unset'
}));

const ChangePwdButton = styled(Button)(({ theme }) => ({
  // marginTop: '2rem',
  color: theme.palette.black.dark,
  width: 'fit-content',
  textTransform: 'unset',
  borderColor: theme.palette.black.dark
  // ':hover': {
  //   borderColor: theme.palette.black.dark
  // }
}));

const AccountSettings = ({
  email,
  setEmail,
  setShowPwdSettings,
  showPwdSettings,
  currentPwd,
  setCurrentPwd,
  helperText,
  catchError,
  confirmPwd,
  setconfirmPwd,
  newPwd,
  setNewPwd,
  showModal,
  setShowModal,
  openModal,
  modalName,
  userId,
  submitPassword,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword
  //   mutation
}) => {
  return (
    <Box component="form" onSubmit={submitPassword}>
      <Grid container mt={8} spacing={3}>
        <Grid lg={12} item>
          <Typography mb={8} variant="h1" className="title-section">
            Account settings
          </Typography>
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Email</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            disabled
            id="email"
            name="email"
            fullWidth
            size="small"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Password</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <FormControlLabel
            style={{ margin: 0 }}
            control={
              <ChangePwdButton
                variant="outlined"
                onClick={() => setShowPwdSettings(!showPwdSettings)}>
                Change password
              </ChangePwdButton>
            }
          />
        </Grid>
        <Grid item md={12}>
          <Collapse in={showPwdSettings}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={2}>
                <InputLabel>Current Password</InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  required
                  id="currentPwd"
                  name="currentPwd"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  value={currentPwd}
                  onChange={(e) => setCurrentPwd(e.target.value)}
                  error={catchError('password')}
                  helperText={helperText('password')}
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
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel>New password</InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  required
                  id="newPwd"
                  name="newPwd"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  value={newPwd}
                  onChange={(e) => setNewPwd(e.target.value)}
                  error={catchError('newPwd')}
                  helperText={helperText('newPwd')}
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
              </Grid>
              <Grid item xs={12} sm={2}>
                <InputLabel>Confirm new password</InputLabel>
              </Grid>
              <Grid item xs={12} sm={10}>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  required
                  id="confirmPwd"
                  name="confirmPwd"
                  fullWidth
                  size="small"
                  autoComplete="off"
                  value={confirmPwd}
                  onChange={(e) => setconfirmPwd(e.target.value)}
                  error={catchError('confirmPwd')}
                  helperText={helperText('confirmPwd')}
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
              </Grid>
              <Grid item xs={12} sm={2} />
              <Grid item xs={12} sm={10} direction="row" display={'flex'} justifyContent="flex-end">
                <SubmitButton
                  type="button"
                  variant="contained"
                  onClick={() => openModal('changePassword')}>
                  Save changes
                </SubmitButton>
                {showModal &&
                  createPortal(
                    <ModalComponent
                      onClose={() => setShowModal(false)}
                      component={modalName}
                      password={currentPwd}
                      newPwd={newPwd}
                      confirmPwd={confirmPwd}
                      id={userId}
                    />,
                    document.body
                  )}
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AccountSettings;
