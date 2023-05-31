/* eslint-disable no-unused-vars */
import React from 'react';
import { Grid, Typography, styled, Button, Box, useTheme, Container } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import competitionSeeds from '../../seeds/competitions';
import './Article.css';
import getFormattedDate from '../../utils/getFormattedDate';
import { AdvancedImage } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import { fill, scale, crop } from '@cloudinary/url-gen/actions/resize';
import { quality } from '@cloudinary/url-gen/actions/delivery';

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

  const imageSrc = file?.public_id;
  const myImage = new CloudinaryImage(imageSrc, { cloudName: 'dbj8kfftk' }).delivery(quality(100));

  const date = getFormattedDate('long', createdAt);

  const competition = competitionSeeds.filter((competition) => competition.idx == topic);
  const code = competition[0]?.code;

  const showStatus = path && path.startsWith('/backoffice');

  return (
    <Grid item key={_id} xs={12} md={4} className="news__article-card">
      {showStatus && (
        <Box sx={{ display: 'flex', alignSelf: 'end', marginBottom: '0.5rem' }}>
          <div className="article-status">
            <FiberManualRecordIcon
              fontSize="small"
              style={{ color: online ? palette.green.main : palette.primary.main }}
            />
            {online ? 'online' : 'offline'}
          </div>
        </Box>
      )}
      <Grid className="backoffice__news_article-card">
        <AdvancedImage cldImg={myImage} />
      </Grid>
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
