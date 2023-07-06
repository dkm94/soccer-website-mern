import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Grid, Container } from '@mui/material';

import { MainContent } from 'components/Layout';
import { NewsSkeleton } from 'components/Loaders';
import Message from 'components/Screens/Message';

import { getArticles } from 'services/queries/public_queries';

import NewsArticle from 'pages/News/Article';

import './News.css';

const News = () => {
	const containerStyle = { padding: '1rem 3rem' };
	const [ articles, setArticles ] = useState([]);

	const {
		data,
		isError,
		isLoading,
	} = useQuery({
		queryKey: [ 'articles' ],
		queryFn: getArticles,
	});
	
	useEffect(() => {
		if(data){
			const copy = [ ...data ].reverse();
			setArticles(copy);
		}
	}, [ data ]);

	const onlineArticles = articles?.filter((filteredArticles) => filteredArticles.online == true);

	return (
		<article>
			<Container className="news">
				<MainContent title={'Latest articles'}>
					<div style={containerStyle}>
						{isError && <Message code={'DEFAULT_ERROR'} img={true} />}
						{isLoading && <NewsSkeleton />}
						{onlineArticles?.length === 0 && <Message code={'DATA_NOT_FOUND'} img={true} />}
						<Grid></Grid>
						<Grid container spacing={2}>
							{onlineArticles?.map((article) => (
								<NewsArticle key={article.id} article={article} />
							))}
						</Grid>
					</div>
				</MainContent>
			</Container>
		</article>
	);
};

export default News;
