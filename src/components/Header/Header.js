import React from 'react';
import './Header.css';
import homeImg from '../../images/home.png';
import playersImg from '../../images/players.jpeg';
import areaImg from '../../images/areas.jpeg';
import competitionImg from '../../images/competitions.jpeg';
import teamsImg from '../../images/teams.jpeg';
import matchImg from '../../images/matches.jpeg';
import myvaforitesImg from '../../images/favorites.jpeg';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, Image, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import slideshow from "../../seeds/home";
import HomeSlideContent from "../../components/HomeSlideContent/HomeSlideContent";
import ArrowCircleLeft from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";


const BackgroundImage = (props) => {
  return (
    <>
      {props?.children}
      <Image className='slide-item' src={props?.img} />
    </>
  )
}

const childrenStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "100%",
  background: "rgba(255, 255, 255, 0.50)",
  padding: "150px 200px"
};

const Carousel = () => {
  return(
    <div className='home-banner'>
      <CarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={35}
      totalSlides={4}
      >
        <Slider>
          {
            slideshow?.map((item, i)=> <Slide key={i} index={item?.idx}>
              <BackgroundImage img={item?.img} >
                <HomeSlideContent 
                style={childrenStyle}
                title={item?.title}
                content={item?.content}
                />
              </BackgroundImage>
            </Slide>)
          }
        </Slider>
        <ButtonBack className='back-btn'><ArrowCircleLeft sx={{ fontSize: 60 }}/></ButtonBack>
        <ButtonNext className='next-btn'><ArrowCircleRight sx={{ fontSize: 60 }}/></ButtonNext>
        <DotGroup className="dot-group-btns" />
      </CarouselProvider>
    </div>
  )
};


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

const Banner = () => {
  return <div className='banner' style={{ backgroundImage: `url('${displayImg(path)}')` }} />
};

const Header = () => {
  return (
    <>
    {path === "/" ? <Carousel /> : <Banner />}
    </>
  )
}

export default Header;