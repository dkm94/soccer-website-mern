import React from 'react';
import './Header.css';
import homeImg from '../../images/home.png';
import playersImg from '../../images/players.jpeg';
import areaImg from '../../images/areas.jpeg';
import competitionImg from '../../images/competitions.jpeg';
import teamsImg from '../../images/teams.jpeg';
import matchImg from '../../images/matches.jpeg';
import myvaforitesImg from '../../images/favorites.jpeg';

const Header = () => {

const path = window.location.pathname;

  const displayImg = (path) => {
    switch (path) {
      case "/games":
        return matchImg;
      case "/players":
        return playersImg;
      case "/area":
        return areaImg;
      case "/competition":
        return competitionImg;
      case "/teams":
        return teamsImg;
      case "/myfavorites":
      return myvaforitesImg;
      default:
        return homeImg;
    }
  }

  return (
    <div className='banner' style={{ backgroundImage: `url('${displayImg(path)}')`, height: "300px", backgroundPosition: "top" }} />
  )
}

export default Header;