import React from 'react';

import { Box, Typography, Grid, styled } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';

import './AuthorCard.css';

const Handle = styled(Typography)({
	fontWeight: 'normal', 
	fontSize: '0.9rem',
});

const Intro = styled(Typography)({
	marginTop: '0.5rem',
	fontSize: '0.8rem',
});

const AuthorCard = ({ infos }) => {
	const { file, handle, intro } = infos;

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
