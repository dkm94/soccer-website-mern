import React from 'react';
import './Header.css';
import homeImg from '../../images/Capture d’écran 2022-04-27 à 11.11.03.png';
import playersImg from '../../images/Ronaldo Football Player Images Prime Wallpapers.jpeg';
import areaImg from '../../images/Amazing top 10 football match wiener players hd wallpapers.jpeg';
import competitionImg from '../../images/soccer wallpapers soccer wallpapers soccer wallpapers soccer.jpeg';
import teamsImg from '../../images/Showing Gallery For Soccer Players Messi Wallpaper.jpeg';
import matchImg from '../../images/Description Soccer Player Wallpaper is a hi res Wallpaper for pc.jpeg';

const Header = () => {

const path = window.location.pathname;

  const displayImg = (path) => {
    switch (path) {
      case "/match":
        return matchImg;
      case "/players":
        return playersImg;
      case "/area":
        return areaImg;
      case "/competition":
        return competitionImg;
      case "/teams":
        return teamsImg;
      default:
        return homeImg;
    }
  }

  return (
    <div className='banner' style={{ backgroundImage: `url('${displayImg(path)}')`, height: "300px", backgroundPosition: "top" }} />
  )
}

export default Header;