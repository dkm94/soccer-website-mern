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
  MenuItem
} from '@mui/material';
import { useQuery } from 'react-query';
import { useEditPost } from '../../../../../services/mutations/useEditPost';
import { useTheme } from '@mui/material';
import ReactQuill from 'react-quill';
import './UpdateArticleForm.css';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { getArticle } from '../../../../../services/queries/public_queries';
import competitionSeeds from '../../../../../seeds/competitions';

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

const UpdateArticleForm = ({ drawerWidth }) => {
  let { id } = useParams();
  const mutation = useEditPost();
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
      setOnline(online);
      setTitle(title);
      setTopic(topic);
      setFiles(file);
      setSummary(summary);
      setCaption(caption);
      setContent(content);
    }
  });

  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [summary, setSummary] = useState('');
  const [files, setFiles] = useState('');
  const [caption, setCaption] = useState('');
  const [online, setOnline] = useState(false);
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const submitPost = (e) => {
    e.preventDefault();
    // const promise = new Promise((resolve, reject) => {
    //   if (!title || !topic || !summary || !files || !caption || !content) {
    //     reject('Error articles');
    //   } else {
    //     resolve('Execute API call next');
    //   }
    // });

    // promise
    //   .then(() =>
    //   )
    //   .catch(() => {
    //     throw new Error('Error mutation');
    //   });
    if (!title || !topic || !summary || !files || !caption || !content) {
      //handle empty with error obj
      alert('empty field');
    } else {
      mutation.mutate(
        { _id: id, online, title, topic, summary, file: files, caption, content },
        id
      );
    }
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
                {/* <MenuItem value="ALL">All games</MenuItem>
                <MenuItem value="FINISHED">Completed games</MenuItem>
                <MenuItem value="TIMED">Timed games</MenuItem>
                <MenuItem value="SCHEDULED">Scheduled games</MenuItem> */}
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
          <Button type="submit">{mutation.isLoading ? 'Uploading...' : 'Edit post'}</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UpdateArticleForm;
