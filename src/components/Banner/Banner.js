import React from 'react';
import homeImg from '../../images/home.png';
import playersImg from '../../images/players.jpeg';
import areaImg from '../../images/areas.jpeg';
import competitionImg from '../../images/competitions.png';
import teamsImg from '../../images/teams.jpeg';
import matchImg from '../../images/matches.jpeg';
import './Banner.css';

const images = {
  '/games': matchImg,
  '/players': playersImg,
  '/area': areaImg,
  '/competitions': competitionImg,
  '/teams': teamsImg,
  '/news':
    'https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltefade31f68de89f2/62fd14904a9f0d30d00a2c30/Miguel_Timm.jpg?quality=80&format=pjpg&auto=webp&width=1000',
  default: homeImg
};

const titles = {
  '/games': matchImg,
  '/players': playersImg,
  '/area': areaImg,
  '/competitions': 'Competitions',
  '/teams': 'Teams',
  '/news': 'News',
  default: 'Title'
};

const Banner = ({ path }) => {
  const displayImg = images[path] || images.default;
  const title = titles[path] || titles.default;

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url('${displayImg}')`,
        backgroundPosition: 'center'
      }}>
      <span className="banner-title">{title}</span>
    </div>
  );
};

export default Banner;
