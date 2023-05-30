import * as React from 'react';
import { Image } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { Typography, Grid, Button } from '@mui/material';

export default function ConfirmationModal({ onClose, message, content, action }) {
  return (
    <Box>
      <Grid container justifyContent={'center'}>
        <Grid container justifyContent={'center'} xs={12}>
          <Image src="../images/icons/warning-red.png" height={'80rem'} />
        </Grid>
        <Grid display={'flex'} flexDirection={'column'}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {message}
          </Typography>
          <Typography id="modal-modal-description">{content}</Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent={'space-evenly'} marginTop={4}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="contained" onClick={action}>
          Confirm
        </Button>
      </Grid>
    </Box>
  );
}
