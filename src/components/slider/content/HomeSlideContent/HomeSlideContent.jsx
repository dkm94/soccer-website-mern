import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Button, Box } from '@mui/material';

import competitionSeeds from 'seeds/competitions';

import './HomeSlideContent.css';

const HomeSlideContent = ({ title, summary, id, topic }) => {
	const Title = styled(Typography)({
		fontSize: '2rem',
		fontWeight: '700',
		fontFamily: '\'Adamina\', serif',
	});

	const Description = styled(Typography)({
		fontSize: '1.1rem',
		display: '-webkit-box',
		'-webkit-line-clamp': '3',
		'-webkit-box-orient': 'vertical',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		lineHeight: '2', 
	});

	const RedirectionButton = styled(Button)(({ theme }) => ({
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.primary.contrastText,
		border: 'none',
		textTransform: 'unset',
	}));

	const competition = competitionSeeds.filter((competition) => competition.idx == topic);
	const code = competition[ 0 ]?.code;

	return (
		<div
			className="home-slide-content"
		>
			<Title className="slider-title">{title}</Title>
			<Description className="slider-description">{summary}</Description>
			<Box sx={{ marginTop: '1rem' }}>
				<RedirectionButton className="redirection-btn" href={`/news/${ code }/${ id }`}>Read the article</RedirectionButton>
			</Box>
		</div>
	);
};

export default HomeSlideContent;
