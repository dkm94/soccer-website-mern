import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useQuery } from 'react-query';
import { getArticle } from '../../services/queries/public_queries';
import competitionSeeds from '../../seeds/competitions';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import { styled } from '@mui/material/styles';
import * as DOMPurify from 'dompurify';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import './NewsPage.css';
import NewsPageSkeleton from '../../components/Loaders/Skeletons/NewsPage/NewsPageSkeleton';
import AuthorCard from '../../components/Cards/Author/AuthorCard';

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.main,
  fontSize: '2rem',
  fontFamily: "'Adamina', serif",
  marginTop: '2rem'
}));

const Summary = styled(Typography)(({ theme }) => ({
  color: theme.palette.black.main,
  fontSize: '1.2rem',
  marginTop: '2rem',
  marginBottom: '2rem'
}));

const NewsPage = () => {
  let { id } = useParams();

  const { data: article, isLoading } = useQuery({
    staleTime: Infinity,
    queryKey: ['articles'],
    queryFn: () => getArticle(id)
  });

  const competition = competitionSeeds.filter((competition) => competition.idx == article?.topic);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  let cleanContent = DOMPurify.sanitize(`${article?.content}`);

  const createdDate = new Date(article?.createdAt);
  const formattedCreatedDate = createdDate?.toLocaleString('en-UK', options);
  const editedDate = new Date(article?.updatedAt);
  const formattedUpdatedDate = editedDate?.toLocaleString('en-UK', options);

  const author = article?.id_profile;

  const imageSrc = article?.file?.public_id;
  const myImage = new CloudinaryImage(imageSrc, { cloudName: 'dbj8kfftk' }).delivery(quality(100));

  return (
    <article>
      <Container className="news-page">
        <MainContent title={competition ? competition[0]?.title : 'Loading...'}>
          {isLoading && <NewsPageSkeleton />}
          {article && (
            <Container>
              <Title variant="h1">{article?.title}</Title>
              <Summary variant="h2">{article?.summary}</Summary>
              <Grid container mb={2}>
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
