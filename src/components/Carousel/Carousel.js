import React from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  Image,
  DotGroup,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import slideshow from "../../seeds/home.js";
import HomeSlideContent from "../../components/HomeSlideContent/HomeSlideContent";
import ArrowCircleLeft from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRight from "@mui/icons-material/ArrowCircleRight";
import "./Carousel.css";

export const BackgroundImage = (props) => {
  return (
    <>
      {props?.children}
      <Image className="slide-item" src={props?.img} />
    </>
  );
};

const childrenStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: "100%",
  background: "rgba(255, 255, 255, 0.50)",
  padding: "150px 200px",
};

const Carousel = () => {
  return (
    <div className="home-banner">
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={35}
        totalSlides={4}
      >
        <Slider>
          {slideshow?.map((item, i) => (
            <Slide key={i} index={item?.idx}>
              <BackgroundImage img={item?.img}>
                <HomeSlideContent
                  style={childrenStyle}
                  title={item?.title}
                  content={item?.content}
                />
              </BackgroundImage>
            </Slide>
          ))}
        </Slider>
        <ButtonBack className="back-btn">
          <ArrowCircleLeft sx={{ fontSize: 60 }} />
        </ButtonBack>
        <ButtonNext className="next-btn">
          <ArrowCircleRight sx={{ fontSize: 60 }} />
        </ButtonNext>
        <DotGroup className="dot-group-btns" />
      </CarouselProvider>
    </div>
  );
};

export default Carousel;
