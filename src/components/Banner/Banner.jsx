import React from 'react';
import data from './data.json';
import './Banner.css';
import { Typography } from '@mui/material';

const Banner = ({ path }) => {
  const element = path && data.bannerElements[path];

  const competitionPage = path && path.startsWith('/competitions');
  const newsPage = path && path.startsWith('/news');

  const competitionsImg = `url("/images/banner${data.bannerElements['/competitions'].img}")`;
  const newsImg = `url("/images/banner${data.bannerElements['/news'].img}")`;

  return (
    <div
      className="banner"
      style={
        competitionPage
          ? {
              backgroundImage: competitionsImg,
              backgroundPosition: 'top'
            }
          : newsPage
          ? {
              backgroundImage: newsImg,
              backgroundPosition: 'top'
            }
          : {
              backgroundImage: `url("/images/banner${element?.img}")`,
              backgroundPosition: 'top'
            }
      }>
      <Typography variant="h1" className="banner-title">
        {competitionPage ? 'Competitions' : newsPage ? 'News' : element?.title}
      </Typography>
    </div>
  );
};

export default Banner;
