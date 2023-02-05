import React from 'react';
import './Header.css';
import Banner from '../Banner/Banner';
import Carousel from '../Carousel/Carousel';
import "./Header.css";

const Header = ({ path }) => {
  return (
    <>
      {path === "/" ? <Carousel /> : <Banner path={path} />}
    </>
  )
}

export default Header;