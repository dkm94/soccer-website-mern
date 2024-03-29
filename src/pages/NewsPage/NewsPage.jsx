import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import DOMPurify from 'dompurify';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { Container, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { AuthorCard } from 'components/Cards';
import { MainContent } from 'components/Layout';
import { NewsPageSkeleton } from 'components/Loaders';

import competitionSeeds from 'seeds/competitions';

import './NewsPage.css';
import { getArticle } from 'services/queries/public_queries';
import Message from 'components/Screens/Message';

const Title = styled(Typography)(({ theme }) => ({
	color: theme.palette.black.main,
	fontSize: '2rem',
	marginTop: '2rem',
}));

const Summary = styled(Typography)(({ theme }) => ({
	color: theme.palette.black.main,
	fontSize: '1rem',
	marginTop: '2rem',
	marginBottom: '2rem',
}));

const NewsPage = () => {
	let { id } = useParams();

	const [ contentTitle, setContentTitle ] = useState('');

	const {
		data: article,
		error,
		isError,
		isLoading,
	} = useQuery({
		staleTime: Infinity,
		queryKey: [ 'article' ],
		queryFn: () => getArticle(id),
	});

	useEffect(() => {
		if (article && competition) {
			setContentTitle(competition[ 0 ]?.title);
		}
		if(isError){
			if(error?.response?.status === 404){
				setContentTitle('404');
			} else {
				setContentTitle('Error');
			}
		}
		if(isLoading){
			setContentTitle('Loading...');
		}
	}, [ isLoading ]);

	const competition = competitionSeeds.filter((competition) => competition.idx == article?.topic);
	const options = {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	};

	let cleanContent = DOMPurify.sanitize(`${ article?.content }`);

	const createdDate = new Date(article?.createdAt);
	const formattedCreatedDate = createdDate?.toLocaleString('en-UK', options);
	const editedDate = new Date(article?.updatedAt);
	const formattedUpdatedDate = editedDate?.toLocaleString('en-UK', options);

	const author = article?.id_profile;

	const imageSrc = article?.file?.public_id;
	const myImage = new CloudinaryImage(imageSrc, { cloudName: 'dbj8kfftk' }).delivery(quality(100));
	
	return (
		<article style={{ width: '100%' }}>
			<Container className="news-page">
				<MainContent title={contentTitle}>
					{isLoading && <NewsPageSkeleton />}
					{isError && <Message img={true} code={'ARTICLE_NOT_FOUND'} error={error?.response?.data?.message} />}
					{article && (
						<Container>
							<Title variant="h1">{article?.title}</Title>
							<Summary variant="h2">{article?.summary}</Summary>
							<Grid container mb={2} className="author-intro">
								<Grid item alignItems="flex-end" sm={12} md={6}>
									<AuthorCard infos={author} />
								</Grid>
								<Grid
									item
									direction="column"
									alignItems="self-end"
									justifyContent="flex-end"
									alignSelf="end"
									textAlign="end"
									sm={12}
									md={6}>
									{formattedCreatedDate === 'Invalid Date' ? (
										''
									) : (
										<Typography variant="body1">Published on {formattedCreatedDate}</Typography>
									)}
									{formattedUpdatedDate === 'Invalid Date' ? (
										''
									) : (
										<Typography variant="body1">Last updated on {formattedUpdatedDate}</Typography>
									)}
								</Grid>
							</Grid>
							<Box>
								<Grid className="news-page__article-img">
									<AdvancedImage cldImg={myImage} />
								</Grid>
								<Grid className="news-page__article-caption">
									<Typography variant="caption" display="block" gutterBottom>
										{article?.caption}
									</Typography>
								</Grid>
								<div
									style={{ marginTop: '2rem' }}
									dangerouslySetInnerHTML={{ __html: cleanContent }}></div>
							</Box>
						</Container>
					)}
				</MainContent>
			</Container>
		</article>
	);
};

export default NewsPage;
