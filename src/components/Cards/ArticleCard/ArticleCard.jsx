/* eslint-disable no-unused-vars */
import React from 'react';

import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';

import competitionSeeds from 'seeds/competitions';
import getFormattedDate from 'utils/getFormattedDate';

import './ArticleCard.css';

const Content = styled(CardContent)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	paddingBottom: 0,
	' span:nth-child(1)': {
		display: '-webkit-box',
		'-webkit-line-clamp': '2',
		'-webkit-box-orient': 'vertical',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
	' span:nth-child(2n+2)': {
		textAlign: 'end',
		marginTop: '0.7rem',
	},
}));

const ArticleCard = ({ id, title, topic, file, date }) => {
	const formattedDate = getFormattedDate('short', date);

	const competition = competitionSeeds.filter((competition) => competition.idx == topic);
	const code = competition[ 0 ]?.code;

	const imageSrc = file?.public_id;

	// .env 
	const myImage = new CloudinaryImage(imageSrc, { cloudName: 'dbj8kfftk' }).delivery(quality(100));

	const redirectToArticle = () => (window.location.href = `/news/${ code }/${ id }`);

	return (
		<Card key={id} className="article-card" onClick={() => redirectToArticle()} >
			<Grid className="backoffice__news_article-card">
				<AdvancedImage cldImg={myImage} />
			</Grid>
			<Content>
				<Typography variant="body1" >{title}</Typography><br />
				<Typography variant="body1" textAlign="end" color="#a9a9a9">Posted on {formattedDate}</Typography>
			</Content>
		</Card>
	);
};

export default ArticleCard;
