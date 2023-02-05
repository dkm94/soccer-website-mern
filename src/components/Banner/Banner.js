import React from "react";
import homeImg from '../../images/home.png';
import playersImg from '../../images/players.jpeg';
import areaImg from '../../images/areas.jpeg';
import competitionImg from '../../images/competitions.png';
import teamsImg from '../../images/teams.jpeg';
import matchImg from '../../images/matches.jpeg';
import "./Banner.css";

const Banner = ({ path }) => {

    const displayImg = (path) => {
      switch (path) {
        case "/games":
          return matchImg;
        case "/players":
          return playersImg;
        case "/area":
          return areaImg;
        case "/competitions":
          return competitionImg;
        case "/teams":
          return teamsImg;
        case "/news":
        return "https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltefade31f68de89f2/62fd14904a9f0d30d00a2c30/Miguel_Timm.jpg?quality=80&format=pjpg&auto=webp&width=1000";
        default:
          return homeImg;
      }
    }
    
    const getTitle = (path) => {
        switch (path) {
          case "/games":
            return matchImg;
          case "/players":
            return playersImg;
          case "/area":
            return areaImg;
          case "/competitions":
            return "Competitions";
          case "/teams":
            return teamsImg;
          case "/news":
              return "News"
          default:
            return "Title";
        }
      }
  
    return (
      <div className='banner' style={{ backgroundImage: `url('${displayImg(path)}')`,backgroundPosition: "center" }}>
        <span className="banner-title">{getTitle(path)}</span>
      </div>
    )
  };

  export default Banner;