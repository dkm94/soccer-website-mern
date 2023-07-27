/* eslint-disable no-unused-vars */
import { Box, Typography, useTheme, Grid } from '@mui/material';
import { UserArticlesSkeleton } from 'components/Loaders';
import Message from 'components/Screens/Message';
import Article from 'pages/News/Article';
import React from 'react';
import { useQuery } from 'react-query';
import { getArticlesByAuthor } from 'services/queries/public_queries';

import './UserArticles.css';

const UserArticles = ({ profileId, path }) => {
	const { palette } = useTheme();

	const {
		data: thisUserArticles,
		// error,
		isError,
		isLoading,
	} = useQuery({
		queryKey: [ 'articles' ],
		queryFn: () => getArticlesByAuthor(profileId),
	});

	return (
		<Box
			component="form"
			className="user-articles"
		>
			<Grid>
				<Grid item mb={4}>
					<Typography variant="h1" className="title-section">
            			My articles
					</Typography>
				</Grid>
				<div className="my-articles">
					{isError && <Message error={'DEFAULT_ERROR'} img={true} />}
					{isLoading && <UserArticlesSkeleton />}
					{thisUserArticles?.map((article) => (
						<Article key={article.id} article={article} profileId={profileId} path={path} />
					))}
					<Grid mt={8}>
						{thisUserArticles?.length === 0 && (
							<span style={{ fontSize: '1rem' }}>
                You can write your first article, <a href="/backoffice/articles/create">here</a>.
							</span>
						)}
					</Grid>
				</div>
			</Grid>
		</Box>
	);
};

export default UserArticles;
