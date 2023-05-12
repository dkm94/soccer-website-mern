/* eslint-disable no-unused-vars */
import React from 'react';
import { Col } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import { Button, Card, CardMedia, CardActions, CardContent } from '@mui/material';
import competitionSeeds from '../../../seeds/competitions';
import './ArticleCard.css';

const RedirectButton = styled(Button)(({ theme }) => ({
  fontSize: 'inherit',
  width: 'fit-content',
  alignSelf: 'self-end',
  textTransform: 'unset',
  '&:hover': {
    backgroundColor: theme.palette.white.main,
    color: theme.palette.black.light
  }
}));

const Content = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: 0,
  ' span:nth-child(1)': {
    fontFamily: "'Adamina', serif",
    display: '-webkit-box',
    '-webkit-line-clamp': '2',
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
  },
  ' span:nth-child(2n+2)': {
    textAlign: 'end',
    marginTop: '0.7rem'
  }
}));

const Actions = styled(CardActions)(({ theme }) => ({
  justifyContent: 'end'
}));

const ArticleCard = ({ id, title, topic, file, caption, date }) => {
  const formattedPath = file?.replaceAll('\\', '/');
  const URL = `https://soccer-api-2zzl.onrender.com/${formattedPath}`;

  const getDate = new Date(date);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = getDate?.toDateString('en-US', options);

  const competition = competitionSeeds.filter((competition) => competition.idx == topic);
  const code = competition[0]?.code;

  return (
    <Card key={id} className="article-card">
      <CardMedia sx={{ height: 140 }} image={URL} title={caption} />
      <Content>
        <span>{title}</span>
        <span>Posted on {formattedDate}</span>
      </Content>
      <Actions>
        <RedirectButton href={`/news/${code}/${id}`}>Read the article</RedirectButton>
      </Actions>
    </Card>
  );
};

export default ArticleCard;
