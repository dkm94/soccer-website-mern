import * as React from 'react';
import { Image } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { Typography, Grid, Button, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  paddingTop: 2
};

export default function ConfirmationModal({ setOpen, open, message, content }) {
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Grid container justifyContent={'flex-end'}>
            <IconButton onClick={handleClose}>
              <CloseIcon color="grey" className="close-icon" />
            </IconButton>
          </Grid>
          <Grid container justifyContent={'center'}>
            <Grid container justifyContent={'center'} xs={12}>
              <Image src="../images/icons/warning-red.png" height={'80rem'} />
            </Grid>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {message}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {content}
            </Typography>
          </Grid>
          <Grid container justifyContent={'space-evenly'} marginTop={4}>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained">Confirm</Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
