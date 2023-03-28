import React from 'react';
import data from './data.json';
import './Banner.css';

const Banner = ({ path }) => {
  const element = path && data.bannerElements[path];

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url("/images/banner${element.img}")`,
        backgroundPosition: 'top'
      }}>
      <span className="banner-title">{element.title}</span>
    </div>
  );
};

export default Banner;
