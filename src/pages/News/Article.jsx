import React from 'react';
import { CardMedia, Grid, Typography, styled, Button, Box } from '@mui/material';
import competitionSeeds from '../../seeds/competitions';
import './Article.css';

const EditButton = styled(Button)(({ theme }) => ({
  marginTop: '1rem',
  backgroundColor: theme.palette.primary.main,
  width: 'fit-content',
  textTransform: 'unset'
}));

const Topic = styled(Typography)(({ theme }) => ({
  marginTop: '1rem',
  fontSize: '0.6rem',
  color: theme.palette.grey.main,
  textTransform: 'uppercase'
}));

const Title = styled(`a`)(({ theme }) => ({
  paddingTop: '0.5rem',
  fontWeight: 600,
  cursor: 'pointer',
  color: theme.palette.black.main,
  '&:hover': {
    color: theme.palette.black.main
  }
}));

const SummaryText = styled(Typography)({
  // paddingTop: '0.5rem',
  display: '-webkit-box',
  '-webkit-line-clamp': '4',
  '-webkit-box-orient': 'vertical',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  marginBottom: '1.5rem'
});

const ArticleDate = styled(Typography)(({ theme }) => ({
  marginTop: '1rem',
  fontSize: '0.7rem',
  color: theme.palette.grey.main
}));

const Article = ({ article, profileId }) => {
  const { _id, title, createdAt, file, topic, summary, id_profile } = article;
  const formattedPath = file?.replaceAll('\\', '/');
  const URL = `https://soccer-api-2zzl.onrender.com/${formattedPath}`;

  console.log('🚀 ~ file: Article.jsx:51 ~ Article ~ URL:', URL);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-UK', options);

  const competition = competitionSeeds.filter((competition) => competition.idx == topic);
  const code = competition[0].code;

  return (
    <Grid item key={_id} xs={12} md={4} className="news__article-card">
      <CardMedia sx={{ height: 140 }} image={URL} title={title} />
      {profileId === id_profile && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <EditButton variant="contained" size="small" href={`/backoffice/articles/edit/${_id}`}>
            Edit
          </EditButton>
        </Box>
      )}
      <Topic>{competitionSeeds[topic]?.title}</Topic>
      <Title href={`/news/${code}/${_id}`} target="_blank" gutterBottom>
        {title}
      </Title>
      <SummaryText variant="body2" gutterBottom>
        {summary}
      </SummaryText>
      <ArticleDate gutterBottom>Written on {formattedDate} </ArticleDate>
    </Grid>
  );
};

export default Article;
