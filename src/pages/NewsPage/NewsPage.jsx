import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useQuery } from 'react-query';
import { getArticle } from '../../services/queries/public_queries';
import competitionSeeds from '../../seeds/competitions';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import { styled } from '@mui/material/styles';
import './NewsPage.css';
import { Image } from 'react-bootstrap';
import * as DOMPurify from 'dompurify';

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

  const { data: article } = useQuery({
    staleTime: Infinity,
    queryKey: ['articles'],
    queryFn: () => getArticle(id)
  });

  const formattedPath = article?.file?.replaceAll('\\', '/');
  const imageURL = `https://soccer-api-2zzl.onrender.com/${formattedPath}`;

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

  const author = article?.id_profile?.handle;

  return (
    <article>
      <Container className="news-page">
        <MainContent title={competition[0]?.title}>
          {article && (
            <Container>
              <Title variant="h1">{article?.title}</Title>
              <Summary variant="h2">{article?.summary}</Summary>
              <Grid container>
                <Grid container alignItems="flex-end" xs={6}>
                  <Typography variant="body1">{author}</Typography>
                </Grid>
                <Grid container direction="column" alignItems="self-end" xs={6}>
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
                <Image
                  src={imageURL}
                  width={'auto'}
                  height="420px"
                  className="news-page__img-article"
                />
                <Typography variant="caption" display="block" gutterBottom>
                  {article?.caption}
                </Typography>
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
