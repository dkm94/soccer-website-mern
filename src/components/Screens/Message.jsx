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

const Btn = styled(Button)({
  textTransform: 'unset',
  backgroundColor: ' #000',
  color: '#FFF'
});
const Message = ({ error, img }) => {
  const message = messages[error?.code];
  const refreshPage = () => window.location.reload();
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
      <MessageContent variant="body2">{message?.content}</MessageContent>
      <Btn onClick={refreshPage}>{message?.button.content}</Btn>
    </Box>
  );
};

export default Message;
