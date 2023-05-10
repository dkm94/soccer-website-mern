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
  Switch
} from '@mui/material';
import { useMutation } from 'react-query';
import { useTheme } from '@mui/material';
import { createPost } from '../../../../../services/queries/mods_queries';
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

const CreateArticleForm = ({ drawerWidth }) => {
  const profileId = JSON.parse(localStorage.getItem('profileId'));

  const { palette } = useTheme();

  const [online, setOnline] = useState(false);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [caption, setCaption] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const mutation = useMutation({
    mutationFn: createPost,
    onError: (error, variables, context) => {
      setErrorMessage(error.message);
    },
    onSuccess: (data, variables, context) => {
      // success toast
      alert('Post ok!');
      window.location.href = `/backoffice/articles/author/${profileId}`;
    }
  });

  const submitPost = (e) => {
    e.preventDefault();
    mutation.mutate({ online, title, topic, summary, file: files, caption, content });
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
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Topic</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Box sx={{ width: 150 }}>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
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
          <TextField
            required
            id="summary"
            name="summary"
            fullWidth
            size="small"
            autoComplete="off"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Image</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="file"
            name="file"
            type="file"
            fullWidth
            size="small"
            autoComplete="off"
            onChange={(e) => setFiles(e.target.files)}
          />
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
            <Typography variant="body1">{errorMessage}</Typography>
          </Grid>
        )}
        <Grid container direction="row" justifyContent="flex-end">
          <Button type="submit">{mutation.isLoading ? 'Uploading...' : 'Create post'}</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateArticleForm;
