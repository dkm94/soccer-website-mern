import * as React from 'react';
import { Image } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { Typography, Grid, Button } from '@mui/material';

// const SuccessButton = styled(Button)(({ theme }) => ({
//   textTransform: 'unset',
//   backgroundColor: theme.palette.green.main
// }));

// const FailButton = styled(Button)(({ theme }) => ({
//   textTransform: 'unset',
//   backgroundColor: theme.palette.primary.main
// }));

// const DefaultButton = styled(Button)(({ theme }) => ({
//   textTransform: 'unset',
//   backgroundColor: theme.palette.black.main
// }));

export default function ConfirmationModal({
  onClose,
  message,
  content,
  action,
  successBtn,
  errorBtn,
  resultMessage,
  loadingMessage,
  isLoading,
  isSuccess,
  isError
}) {
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
      <Grid container justifyContent={'center'} mt={2}>
        <Grid>
          {isError && (
            <Typography color="primary.main" variant="body1">
              {resultMessage}
            </Typography>
          )}
          {/* {isSuccess && (
            <Typography color="green.main" variant="body1">
              {resultMessage}
            </Typography>
          )} */}
        </Grid>
      </Grid>
      <Grid container justifyContent={'space-evenly'} marginTop={4}>
        <Button variant="outlined" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          style={
            isSuccess
              ? { backgroundColor: 'green' }
              : isError
              ? { backgroundColor: 'red' }
              : { backgroundColor: 'black', color: 'white' }
          }
          onClick={action}>
          {isSuccess ? successBtn : isError ? errorBtn : isLoading ? loadingMessage : 'Confirm'}
        </Button>
      </Grid>
    </Box>
  );
}
