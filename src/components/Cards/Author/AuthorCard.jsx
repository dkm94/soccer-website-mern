import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { Box, Typography, Grid, styled } from '@mui/material';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import './AuthorCard.css';

const Handle = styled(Typography)({
  fontFamily: "'Adamina', serif"
});

const Intro = styled(Typography)({
  marginTop: '0.5rem'
});

const AuthorCard = ({ infos }) => {
  const { handle, intro, file } = infos;

  const imageSrc = file?.public_id;
  const myImage = new CloudinaryImage(imageSrc, { cloudName: 'dbj8kfftk' }).delivery(quality(100));

  return (
    <Box fluid className="author-card__wrapper">
      <Grid className="author-card__img">
        <AdvancedImage cldImg={myImage} />
      </Grid>
      <Grid>
        <Handle>{handle}</Handle>
        <Intro>{intro}</Intro>
      </Grid>
    </Box>
  );
};

export default AuthorCard;
