import React from 'react';
import { CardMedia, Grid, Typography, styled, Button, Box, useTheme } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import competitionSeeds from '../../seeds/competitions';
import './Article.css';
import getFormattedDate from '../../utils/getFormattedDate';

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

const Article = ({ article, profileId, path }) => {
  const { palette } = useTheme();
  const { _id, title, createdAt, file, topic, summary, id_profile, online } = article;
  const formattedPath = file?.replaceAll('\\', '/');
  const URL = `https://soccer-api-2zzl.onrender.com/${formattedPath}`;

  const date = getFormattedDate('long', createdAt);

  const competition = competitionSeeds.filter((competition) => competition.idx == topic);
  const code = competition[0]?.code;

  const showStatus = path && path.startsWith('/backoffice');

  return (
    <Grid item key={_id} xs={12} md={4} className="news__article-card">
      {showStatus && (
        <Box sx={{ display: 'flex', alignSelf: 'end', marginBottom: '1rem' }}>
          <div className="article-status">
            <FiberManualRecordIcon
              fontSize="small"
              style={{ color: online ? palette.green.main : palette.primary.main }}
            />
            {online ? 'online' : 'offline'}
          </div>
        </Box>
      )}
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
      <ArticleDate gutterBottom>Written on {date} </ArticleDate>
    </Grid>
  );
};

export default Article;
