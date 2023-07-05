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
import { CloudinaryImage } from '@cloudinary/url-gen';

import { SlideContent } from 'components/slider';
import slideshow from 'seeds/home';

import 'pure-react-carousel/dist/react-carousel.es.css';
import './Carousel.css';
import { AdvancedImage } from '@cloudinary/react';


export const BackgroundImage = (props) => {
	const { img } = props;
	const imgPath = img?.public_id;
	const myImage = new CloudinaryImage(imgPath, { cloudName: 'dbj8kfftk' });
	
	return (
		<>
			{props?.children}
			{/* <Image className="slide-item" src={myImage} /> */}
			<AdvancedImage cldImg={myImage} className="carousel-img" />
		</>
	);
};

const Carousel = ({ articles }) => {
	return (
		<div className="home-banner">
			<CarouselProvider naturalSlideWidth={100} naturalSlideHeight={35} totalSlides={articles?.length}>
				<Slider>
					{articles?.map((item, i) => (
						<Slide key={item._id} index={i}>
							<BackgroundImage img={item?.file}>
								<SlideContent title={item?.title} summary={item?.summary} key={item?._id} id={item?._id} topic={item?.topic} />
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
