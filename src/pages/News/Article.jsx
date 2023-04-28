import React from 'react';
import { CardMedia, Grid, Typography, styled } from '@mui/material';
import './Article.css';

const Topic = styled(Typography)(({ theme }) => ({
  marginTop: '1rem',
  fontSize: '0.6rem',
  color: theme.palette.grey.main,
  textTransform: 'uppercase'
}));

const Title = styled(Typography)({
  paddingTop: '0.5rem',
  fontWeight: 600
});

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

const Article = ({ article }) => {
  const { _id, title, createdAt, file, topic, summary } = article;
  const formattedPath = file?.replaceAll('\\', '/');
  const URL = `https://soccer-api-2zzl.onrender.com/${formattedPath}`;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString('en-UK', options);

  return (
    <Grid item key={_id} xs={12} md={4} className="news__article-card">
      <CardMedia sx={{ height: 140 }} image={URL} title={title} />
      <Topic>{topic}</Topic>
      <Title variant="body1" gutterBottom>
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
