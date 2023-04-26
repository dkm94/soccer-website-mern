/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, InputLabel, TextField, Grid, Button, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { useTheme } from '@mui/material';
import { createPost } from '../../../../../services/queries/mods_queries';
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
  const { palette } = useTheme();

  const [title, setTitle] = useState('');
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
      // success popup
      alert('Post ok!');
    }
  });

  const submitPost = (e) => {
    e.preventDefault();
    mutation.mutate({ title, summary, file: files[0], caption, content });
  };

  return (
    <Box
      component="form"
      onSubmit={submitPost}
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: 'grid',
        gap: '2rem',
        mt: '2rem',
        backgroundColor: palette?.white.main,
        borderRadius: '5px'
      }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={2}>
          <InputLabel>Title</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="title"
            name="title"
            // label="Title"
            fullWidth
            size="small"
            autoComplete="off"
            // variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <InputLabel>Summary</InputLabel>
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            required
            id="summary"
            name="summary"
            // label="Title"
            fullWidth
            size="small"
            autoComplete="off"
            // variant="outlined"
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
            // label="Title"
            fullWidth
            size="small"
            autoComplete="off"
            // variant="outlined"
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
            // label="Title"
            fullWidth
            size="small"
            autoComplete="off"
            // variant="outlined"
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
