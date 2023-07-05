import React from 'react';
import ArrowCircleLeft from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRight from '@mui/icons-material/ArrowCircleRight';
import { CarouselProvider,
	Slider,
	Slide,
	ButtonBack,
	ButtonNext,
	Image,
	DotGroup } from 'pure-react-carousel';

import { SlideContent } from 'components/slider';
import slideshow from 'seeds/home';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.css';


export const BackgroundImage = (props) => {
	return (
		<>
			{props?.children}
			<Image className="slide-item" src={props?.img} />
		</>
	);
};

const Carousel = () => {
	return (
		<div className="home-banner">
			<CarouselProvider naturalSlideWidth={100} naturalSlideHeight={35} totalSlides={4}>
				<Slider>
					{slideshow?.map((item, i) => (
						<Slide key={item.id} index={i}>
							<BackgroundImage img={item?.img}>
								<SlideContent title={item?.title} content={item?.content} />
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
