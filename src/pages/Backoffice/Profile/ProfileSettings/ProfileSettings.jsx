import React from 'react';
import {
  Grid,
  Typography,
  TextField,
  InputLabel,
  Button,
  Box,
  Snackbar,
  styled
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { AdvancedImage } from '@cloudinary/react';
import UploadButton from '../../../../components/Buttons/Upload/UploadButton';

const SubmitButton = styled(Button)(({ theme }) => ({
  // marginTop: '2rem',
  backgroundColor: theme.palette.black.dark,
  width: 'fit-content',
  textTransform: 'unset'
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ProfileSettings = ({
  submitProfile,
  profile,
  avatar,
  myImage,
  name,
  setName,
  helperText,
  catchError,
  handle,
  setHandle,
  intro,
  handleImage,
  files,
  fileName,
  setIntro,
  openSuccess,
  successMessage,
  errorMessage,
  openError,
  handleClose,
  mutation
}) => {
  return (
    <Box component="form" onSubmit={submitProfile}>
      <Grid container spacing={3}>
        <Grid lg={12} item className="profile__avatar">
          <Typography variant="h1" className="title-section">
            My profile
          </Typography>

          {profile?.file === '' ? (
            <Box
              component="img"
              sx={{
                height: 229,
                width: 220,
                maxHeight: { xs: 100, md: 150, lg: 200 },
                maxWidth: { xs: 100, md: 150, lg: 200 },
                borderRadius: '50%',
                alignSelf: 'center',
                mt: '2rem'
              }}
              alt="default avatar"
              src={avatar}
            />
          ) : (
            <AdvancedImage cldImg={myImage} />
          )}
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Name</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="name"
            name="name"
            fullWidth
            size="small"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={catchError('name')}
            helperText={helperText('name')}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Handle</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="handle"
            name="handle"
            fullWidth
            size="small"
            autoComplete="off"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            error={catchError('handle')}
            helperText={helperText('handle')}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Introduction</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="intro"
            name="intro"
            fullWidth
            size="small"
            autoComplete="off"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            multiline
            minRows={3}
            error={catchError('intro')}
            helperText={helperText('intro')}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Avatar</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10} style={{ display: 'flex', flexDirection: 'row' }}>
          <UploadButton getFiles={handleImage} files={files} fileName={fileName} />
        </Grid>
        <Grid item xs={12} sm={2} />
        <Grid item xs={12} sm={10} direction="row" display={'flex'} justifyContent="flex-end">
          <SubmitButton type="submit" variant="contained">
            {mutation.isLoading ? 'Saving...' : 'Edit profile'}
          </SubmitButton>
        </Grid>
        <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: '100%', color: '#FFF' }}>
            {successMessage}
          </Alert>
        </Snackbar>
        <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
          <Alert severity="error" sx={{ width: '100%', color: '#FFF' }}>
            {errorMessage}
          </Alert>
        </Snackbar>
      </Grid>
    </Box>
  );
};

export default ProfileSettings;
