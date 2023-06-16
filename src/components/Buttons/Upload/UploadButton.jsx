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

const UploadButton = ({ getFiles, files, oldFile, fileName }) => {
  return (
    <UploadLabel htmlFor="file">
      <input
        style={{ display: 'none' }}
        id="file"
        name="file"
        type="file"
        accept=".jpeg, .png, .jpg"
        onChange={getFiles}
      />
      {files || oldFile ? (
        <Button
          color="success"
          variant="contained"
          component="span"
          id="upload-file-btn"
          style={{ width: '10rem' }}
          endIcon={<CheckCircleIcon style={{ color: '#fff' }} />}>
          Edit file
        </Button>
      ) : (
        <Button color="secondary" variant="contained" component="span" id="upload-file-btn">
          Choose file
        </Button>
      )}
      {files || oldFile ? (
        <UploadText variant="body1">{fileName || oldFile.public_id}</UploadText>
      ) : (
        <UploadText variant="body1">(.jpeg, .png, .jpg)</UploadText>
      )}
    </UploadLabel>
  );
};

export default UploadButton;
