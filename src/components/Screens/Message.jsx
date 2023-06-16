import React from 'react';
import { Box, Button, Typography, Container, styled } from '@mui/material';
import { Image } from 'react-bootstrap';
import messages from './messages.json';

const ImageWrapper = styled(Container)({
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center'
});

const MessageType = styled(Typography)({
  fontSize: '2rem',
  marginTop: '2rem'
});

const MessageContent = styled(Typography)({
  fontSize: '1.2rem'
});

const Btn = styled(Button)(({ theme }) => ({
  textTransform: 'unset',
  backgroundColor: theme.palette.black.light,
  color: theme.palette.black.contrastText,
  margin: '2rem',
  ':hover': {
    color: theme.palette.black.dark
  }
}));

const Message = ({ code, img, error }) => {
  const message = messages[code];

  const refreshPage = () => window.location.reload();
  const redirectToMatchHistory = () => (window.location.href = '/matchhistory');

  const action = () => {
    const { button } = message;
    switch (button.action) {
      case 'redirect':
        redirectToMatchHistory();
        break;
      case 'reload':
        refreshPage();
        break;
      default:
        return;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '3rem 0'
      }}>
      {img && (
        <ImageWrapper>
          <Image
            src={`/images/icons/${message?.img}`}
            style={{
              width: 'auto',
              height: '15rem',
              padding: 0,
              margin: 0
            }}
          />
        </ImageWrapper>
      )}
      <MessageType variant="body1">{message?.type}</MessageType>
      <MessageContent variant="body2">{error?.message || message?.content}</MessageContent>
      {error?.description && <MessageContent variant="body2">{error?.description}</MessageContent>}
      {message?.button && <Btn onClick={action}>{message?.button.content}</Btn>}
    </Box>
  );
};

export default Message;
