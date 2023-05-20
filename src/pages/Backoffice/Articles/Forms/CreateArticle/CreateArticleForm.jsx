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
  styled
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useTheme } from '@mui/material';
import { useCreatePost } from '../../../../../services/mutations/Articles/useCreatePost';
import competitionSeeds from '../../../../../seeds/competitions';
import ReactQuill from 'react-quill';
import './CreateArticleForm.css';
import 'react-quill/dist/quill.snow.css';
import UploadButton from '../../../../../components/Buttons/Upload/UploadButton';
import formats from '../../../../../utils/quillVars/formats';
import modules from '../../../../../utils/quillVars/modules';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SubmitButton = styled(Button)(({ theme }) => ({
  textTransform: 'unset',
  marginTop: '2rem',
  backgroundColor: theme.palette.black.dark
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

  const handleClose = (event) => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  const submitPost = (e) => {
    e.preventDefault();
    mutation.mutate({ online, title, topic, summary, file: files, caption, content });
  };

  const helperText = (field) => error?.messages[field];
  const catchError = (field) => {
    if (error?.messages) {
      return field in error.messages;
    }
  };

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
            error={catchError('title')}
            helperText={helperText('title')}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Topic</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Box sx={{ width: 150 }}>
            <FormControl sx={{ minWidth: 120, ml: 'none' }} size="small">
              <Select
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                displayEmpty
                name="topic"
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
            error={catchError('summary')}
            helperText={helperText('summary')}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Image</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10} style={{ display: 'flex', flexDirection: 'row' }}>
          <UploadButton getFiles={setFiles} files={files} />
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
            error={catchError('caption')}
            helperText={helperText('caption')}
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
        <Grid container direction="row" justifyContent="flex-end">
          <SubmitButton type="submit" variant="contained">
            {mutation.isLoading ? 'Uploading...' : 'Create post'}
          </SubmitButton>
        </Grid>
      </Grid>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {error?.error.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CreateArticleForm;
