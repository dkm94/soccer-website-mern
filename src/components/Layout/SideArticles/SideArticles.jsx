/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { useQuery } from 'react-query';
import { Col } from 'react-bootstrap';
import { Box, useTheme } from '@mui/material';

import { ArticleCard } from 'components/Cards';
import { MainContent } from 'components/Layout';
import { SideArticlesSkeleton } from 'components/Loaders';
import Message from 'components/Screens/Message';

import { getLastArticles } from 'services/queries/public_queries';

import './SideArticles.css';

const SideArticles = () => {
	const {
		data: articles,
		error,
		isError,
		isLoading,
	} = useQuery({
		queryKey: [ 'articles' ],
		queryFn: getLastArticles,
	});

	const { palette } = useTheme();

	return (
		<Col lg={4} className="comment-layout">
			<MainContent title={'Last articles'} width={'80%'}>
				<Box sx={{ background: palette?.white?.main }}>
					{isError && <Message error={error?.code} img={false} />}
					<div className="cmt-content">
						{articles?.length === 0 && <span>{'There\'s no content to load yet.'}</span>}
						{isLoading && <SideArticlesSkeleton />}
						{articles &&
              articles.map(({ _id, title, topic, caption, file, updatedAt }, i) => (
              	<ArticleCard
              		id={_id}
              		key={_id}
              		title={title}
              		topic={topic}
              		file={file}
              		caption={caption}
              		date={updatedAt}
              	/>
              ))}
					</div>
				</Box>
			</MainContent>
		</Col>
	);
};

export default SideArticles;
