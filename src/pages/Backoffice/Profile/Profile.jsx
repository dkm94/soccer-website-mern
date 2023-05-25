/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  InputLabel,
  Snackbar,
  styled,
  Button
} from '@mui/material';
import { useTheme } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import UploadButton from '../../../components/Buttons/Upload/UploadButton';
import './Profile.css';
import { useQuery } from 'react-query';
import { getProfile } from '../../../services/queries/public_queries';
import { useEditProfile } from '../../../services/mutations/Profiles/useEditProfile';
import { useParams } from 'react-router-dom';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill, crop, scale } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { format } from '@cloudinary/url-gen/actions/delivery';
import { max } from '@cloudinary/url-gen/actions/roundCorners';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import avatar from '../../../../src/images/avatar.png';

const SubmitButton = styled(Button)(({ theme }) => ({
  // marginTop: '2rem',
  backgroundColor: theme.palette.black.dark,
  width: 'fit-content',
  textTransform: 'unset'
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = ({ drawerWidth, profileId }) => {
  let { id } = useParams();
  const { palette } = useTheme();

  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [intro, setIntro] = useState('');
  const [files, setFiles] = useState('');
  const [oldFile, setOldFile] = useState('');
  const [fileName, setFilename] = useState('');

  const [tempForm, setTempForm] = useState(null);

  const [errorObj, setErrorObj] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const mutation = useEditProfile(
    setSuccessMessage,
    setOpenSuccess,
    setOpenError,
    setErrorMessage,
    setTempForm,
    setErrorObj,
    setFilename
  );

  const {
    data: profile,
    error,
    isError,
    isLoading
  } = useQuery({
    staleTime: Infinity,
    queryKey: ['profiles'],
    queryFn: () => getProfile(profileId),
    onSuccess: (data) => {
      const { name, handle, intro, file } = data;
      if (!tempForm) {
        setName(name);
        setHandle(handle);
        setIntro(intro);
        setOldFile(file);
      } else {
        setName(tempForm?.name);
        setHandle(tempForm?.handle);
        setIntro(tempForm?.intro);
        if (tempForm?.file[0]) {
          setFiles(tempForm?.files);
        }
      }
    },
    keepPreviousData: true
  });

  const handleClose = (event) => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const submitProfile = (e) => {
    e.preventDefault();
    mutation.mutate({ _id: id, name, handle, intro, file: files }, id);
  };

  // const formattedPath = profile?.file?.replaceAll('\\', '/');
  // const imageURL = `https://soccer-api-2zzl.onrender.com/${formattedPath}`;
  // console.log(imageURL);

  const handleImage = async (e) => {
    const img = e.target.files[0];
    const base64 = await convertToBase64(img);
    setFilename(img.name);
    setFiles(base64);
  };

  const convertToBase64 = (img) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const helperText = (field) => errorObj?.messages[field];
  const catchError = (field) => {
    if (errorObj?.messages) {
      return field in errorObj.messages;
    }
  };

  const imageSrc = profile?.file?.public_id;

  const myImage = new CloudinaryImage(imageSrc, { cloudName: 'dbj8kfftk' })
    .resize(crop().width(400).height(400).gravity(focusOn(face())))
    .roundCorners(max())
    .resize(scale().width(200))
    .delivery(format(auto()));

  return (
    <Box
      component="form"
      onSubmit={submitProfile}
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
          {/* <UploadButton getFiles={setFiles} files={files} /> */}
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

export default Profile;
