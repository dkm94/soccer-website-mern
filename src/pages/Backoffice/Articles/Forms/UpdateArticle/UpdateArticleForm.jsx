/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  InputLabel,
  TextField,
  Grid,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  Snackbar,
  styled
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useQuery } from 'react-query';
import { useEditPost } from '../../../../../services/mutations/Articles/useEditPost';
import { useTheme } from '@mui/material';
import ReactQuill from 'react-quill';
import './UpdateArticleForm.css';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { getArticle } from '../../../../../services/queries/public_queries';
import competitionSeeds from '../../../../../seeds/competitions';
import { useDeletePost } from '../../../../../services/mutations/Articles/useDeletePost';
import UploadButton from '../../../../../components/Buttons/Upload/UploadButton';
import modules from '../../../../../utils/quillVars/modules';
import formats from '../../../../../utils/quillVars/formats';
import UpdateArticleFormSkeleton from '../../../../../components/Loaders/Skeletons/Forms/UpdateArticleFormSkeleton';
import Message from '../../../../../components/Screens/Message';
import CustomTexField from '../../../../../components/Inputs/TextField/CustomTexField';

const SubmitButton = styled(Button)(({ theme }) => ({
  // marginTop: '2rem',
  backgroundColor: theme.palette.black.dark,
  width: 'fit-content',
  textTransform: 'unset'
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  // marginTop: '2rem',
  // backgroundColor: theme.palette.primary.main,
  width: 'fit-content',
  textTransform: 'unset'
}));

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateArticleForm = ({ drawerWidth }) => {
  let { id } = useParams();

  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [oldFile, setOldFile] = useState('');
  const [caption, setCaption] = useState('');
  const [online, setOnline] = useState(false);
  const [content, setContent] = useState('');
  const [fileName, setFilename] = useState('');

  const [errorObj, setErrorObj] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [openError, setOpenError] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const [tempForm, setTempForm] = useState(null);

  const mutation = useEditPost(
    setSuccessMessage,
    setOpenSuccess,
    setOpenError,
    setErrorMessage,
    setTempForm,
    setErrorObj,
    setFilename
  );

  const deleteMutation = useDeletePost(
    setSuccessMessage,
    setOpenSuccess,
    setOpenError,
    setErrorMessage,
    setErrorObj
  );

  const { palette } = useTheme();

  const {
    data: article,
    error,
    isError,
    isLoading
  } = useQuery({
    staleTime: Infinity,
    queryKey: ['articles'],
    queryFn: () => getArticle(id),
    onSuccess: (data) => {
      const { online, title, topic, file, summary, caption, content } = data;
      if (!tempForm) {
        setOnline(online);
        setTitle(title);
        setTopic(topic);
        setOldFile(file);
        setSummary(summary);
        setCaption(caption);
        setContent(content);
      } else {
        setOnline(tempForm?.online);
        setTitle(tempForm?.title);
        setTopic(tempForm?.topic);
        setSummary(tempForm?.summary);
        setCaption(tempForm?.caption);
        setContent(tempForm?.content);
        if (tempForm?.file[0]) {
          setFiles(tempForm?.files);
        }
      }
    },
    keepPreviousData: true
  });

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

  const handleClose = (event) => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const submitPost = (e) => {
    e.preventDefault();
    mutation.mutate({ _id: id, online, title, topic, summary, file: files, caption, content }, id);
  };

  const deletePost = (e) => {
    e.preventDefault();
    deleteMutation.mutate(id);
  };

  const helperText = (field) => errorObj?.messages[field];
  const catchError = (field) => {
    if (errorObj?.messages) {
      return field in errorObj.messages;
    }
  };

  const status = error?.response?.status;
  const message = error?.response?.data;

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
        borderRadius: '5px',
        boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)'
      }}>
      <Grid item>
        <Typography variant="h1" className="title-section">
          Edit your article
        </Typography>
      </Grid>
      {isLoading && <UpdateArticleFormSkeleton />}
      {isError && status == 404 && <Message code={'DEFAULT_ERROR'} error={message} img={true} />}
      {isError && status !== 404 && <Message code={'DEFAULT_ERROR'} img={true} />}
      {article && (
        <Grid container spacing={3}>
          <Grid container direction="row" marginTop={4} justifyContent="flex-end" xs={12}>
            <FormControlLabel
              value={online}
              label={online ? 'Online' : 'Offline'}
              labelPlacement="end"
              onChange={() => setOnline(!online)}
              control={<Switch color="success" />}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel>Title</InputLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTexField
              required
              counter
              type="text"
              id="title"
              name="title"
              fullWidth
              size="small"
              autoComplete="off"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={catchError('title')}
              helperText={helperText('title')}
              inputProps={{
                maxLength: 250
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel>Topic</InputLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <Box sx={{ width: 150 }}>
              <FormControl sx={{ minWidth: 120 }} size="small">
                <Select
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}>
                  {competitionSeeds.map((item, i) => (
                    <MenuItem value={item.idx} key={item.idx}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel>Summary</InputLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTexField
              required
              counter
              type="text"
              id="summary"
              name="summary"
              fullWidth
              size="small"
              autoComplete="off"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              error={catchError('summary')}
              helperText={helperText('summary')}
              inputProps={{
                maxLength: 500
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel>Image</InputLabel>
          </Grid>
          <Grid item xs={12} sm={10} style={{ display: 'flex', flexDirection: 'row' }}>
            <UploadButton
              getFiles={handleImage}
              files={files}
              oldFile={oldFile}
              fileName={fileName}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel>Image caption</InputLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <CustomTexField
              required
              counter
              type="text"
              id="caption"
              name="caption"
              fullWidth
              size="small"
              autoComplete="off"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              error={catchError('caption')}
              helperText={helperText('caption')}
              inputProps={{
                maxLength: 200
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <InputLabel>Content</InputLabel>
          </Grid>
          <Grid item xs={12} sm={10}>
            <ReactQuill
              value={content}
              onChange={(newContent) => setContent(newContent)}
              modules={modules}
              formats={formats}
              placeholder="Write something"
            />
          </Grid>
          <Grid item xs={12} sm={2} />
          <Grid
            item
            xs={12}
            sm={10}
            direction="row"
            display={'flex'}
            justifyContent="space-between">
            <DeleteButton variant="outlined" onClick={deletePost}>
              {deleteMutation.isLoading ? 'Uploading...' : 'Delete post'}
            </DeleteButton>
            <SubmitButton type="submit" variant="contained">
              {mutation.isLoading ? 'Saving...' : 'Save changes'}
            </SubmitButton>
          </Grid>
          <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="success" sx={{ width: '100%', color: '#FFF' }}>
              {successMessage}
            </Alert>
          </Snackbar>
          <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity="error" sx={{ width: '100%', color: '#FFF' }}>
              {errorMessage || error?.message}
            </Alert>
          </Snackbar>
        </Grid>
      )}
    </Box>
  );
};

export default UpdateArticleForm;
