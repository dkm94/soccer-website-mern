import React from 'react';
import Banner from 'components/Banner/Banner';
import Carousel from 'components/Carousel/Carousel';
import './Header.css';

const Header = ({ path }) => {
  return <>{path === '/' || path === '/home' ? <Carousel /> : <Banner path={path} />}</>;
};

export default Header;
