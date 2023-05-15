/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Box,
  InputLabel,
  TextField,
  Grid,
  Button,
  Typography,
  Select,
  FormControl,
  MenuItem,
  FormControlLabel,
  Switch,
  Snackbar,
  IconButton,
  styled
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material';
import { useCreatePost } from '../../../../../services/mutations/Articles/useCreatePost';
import competitionSeeds from '../../../../../seeds/competitions';
import ReactQuill from 'react-quill';
import './CreateArticleForm.css';
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ['clean'] // remove formatting button
  ]
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color'
];

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UploadText = styled(Typography)(({ theme }) => ({
  placeSelf: 'center',
  marginLeft: '1rem'
}));

const UploadLabel = styled('label')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  placeItems: 'center'
}));

const CreateArticleForm = ({ drawerWidth }) => {
  const { palette } = useTheme();

  const [online, setOnline] = useState(false);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [caption, setCaption] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const mutation = useCreatePost(setSuccessMessage, setOpenSuccess, setOpenError, setError);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
  };

  const submitPost = (e) => {
    e.preventDefault();
    mutation.mutate({ online, title, topic, summary, file: files, caption, content });
  };

  let invalidFields;
  error ? (invalidFields = error.fields) : (invalidFields = []);

  // const isError = error && true;
  console.log(files[0]);

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
        boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)'
      }}>
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h1" className="title-section">
            Create an article
          </Typography>
        </Grid>
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
          <TextField
            required
            id="title"
            name="title"
            fullWidth
            size="small"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={invalidFields.includes('title')}
            // helperText={invalidFields.includes('title') && 'Show error'}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Topic</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Box sx={{ width: 150 }}>
            <FormControl sx={{ minWidth: 120, ml: 'none' }} size="small">
              <Select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                displayEmpty
                name="topic"
                error={invalidFields.includes('topic')}
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
          <TextField
            required
            id="summary"
            name="summary"
            fullWidth
            size="small"
            autoComplete="off"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            error={invalidFields.includes('summary')}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Image</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10} style={{ display: 'flex', flexDirection: 'row' }}>
          <UploadLabel htmlFor="file">
            <input
              style={{ display: 'none' }}
              id="file"
              name="file"
              type="file"
              onChange={(e) => setFiles(e.target.files)}
            />
            {files[0] ? (
              <Button
                color="success"
                variant="contained"
                component="span"
                id="upload-file-btn"
                style={{ width: '10rem' }}
                endIcon={<CheckCircleIcon style={{ color: '#fff' }} />}>
                Choose file
              </Button>
            ) : (
              <Button color="secondary" variant="contained" component="span" id="upload-file-btn">
                Choose file
              </Button>
            )}
            {files[0] ? (
              <UploadText variant="body1">{files[0]?.name}</UploadText>
            ) : (
              <UploadText variant="body1">No file chosen</UploadText>
            )}
          </UploadLabel>
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Image caption</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="caption"
            name="caption"
            fullWidth
            size="small"
            autoComplete="off"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            error={invalidFields.includes('caption')}
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
          />
        </Grid>
        {mutation.error && (
          <Grid item>
            <Typography variant="body1">{error?.messages}</Typography>
          </Grid>
        )}
        <Grid container direction="row" justifyContent="flex-end">
          <Button type="submit">{mutation.isLoading ? 'Uploading...' : 'Create post'}</Button>
        </Grid>
      </Grid>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error?.error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateArticleForm;
