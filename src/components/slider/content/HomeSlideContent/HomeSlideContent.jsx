import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Button, Box } from '@mui/material';

import competitionSeeds from 'seeds/competitions';

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
		<Box
			sx={{
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate(-50%, -50%)',
				height: '100%',
				width: '100%',
				background: 'rgba(255, 255, 255, 0.50)',
				padding: '150px 200px',
			}}>
			<Title>{title}</Title>
			<Description>{summary}</Description>
			<Box sx={{ marginTop: '1rem' }}>
				<RedirectionButton href={`/news/${ code }/${ id }`}>Read the article</RedirectionButton>
			</Box>
		</Box>
	);
};

export default HomeSlideContent;
