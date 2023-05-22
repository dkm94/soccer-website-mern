import React from 'react';
import { Button, styled, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const UploadText = styled(Typography)({
  placeSelf: 'center',
  marginLeft: '1rem'
});

const UploadLabel = styled('label')({
  display: 'flex',
  flexDirection: 'row',
  placeItems: 'center'
});

const UploadButton = ({ getFiles, files, oldFile }) => {
  return (
    <UploadLabel htmlFor="file">
      <input
        style={{ display: 'none' }}
        id="file"
        name="file"
        type="file"
        onChange={(e) => getFiles(e.target.files)}
      />
      {files[0] || oldFile ? (
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
      {files[0] || oldFile ? (
        <UploadText variant="body1">{files[0]?.name || oldFile}</UploadText>
      ) : (
        <UploadText variant="body1">No file chosen</UploadText>
      )}
    </UploadLabel>
  );
};

export default UploadButton;
