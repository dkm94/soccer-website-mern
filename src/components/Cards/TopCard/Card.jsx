/* eslint-disable no-unused-vars */
import React from 'react';
import { useQuery } from 'react-query';

import { Paper, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { SuspenseLoader } from 'components/Loaders';

import { getUsers, getArticles } from 'services/queries/public_queries';

import './Card.css';

const Item = styled(Paper)(({ theme }) => ({
	// height: 60,
	// lineHeight: '60px',
	padding: '1rem 2rem',
	position: 'relative',
}));

const Card = ({ title, icon, collection, wip }) => {
	const getResource = {
		users: getUsers,
		articles: getArticles,
		// comments: getReportedComments
	};

	const {
		data: cardData,
		error,
		isError,
		isLoading,
	} = useQuery({
		queryKey: [ collection ],
		queryFn: getResource[ collection ],
	});

	const Icon = styled(Paper)(({ theme }) => ({
		height: 48,
		width: 48,
		// lineHeight: '60px',
		position: 'absolute',
		bottom: '70%',
	}));

	const count = {
		articles: cardData?.length,
		comments: cardData?.length,
	};

	return (
		<Grid item md={4} style={{
			opacity: '90%',
			boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)', 
		}}>
			<Item className={!collection && 'unavailable'}>
				<Typography style={{ textAlign: 'end' }}>{title}</Typography>
				<Typography style={{
					textAlign: 'center',
					fontSize: '2rem', 
				}}>
					{!collection ? 'Unavailable' : count[ collection ]}
				</Typography>
				<Icon>{icon}</Icon>
				{isLoading && collection && <SuspenseLoader />}
			</Item>
		</Grid>
	);
};

export default Card;
