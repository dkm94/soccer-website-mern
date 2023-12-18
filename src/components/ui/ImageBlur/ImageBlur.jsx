import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import image from './../../../images/C71M9002.jpg';

export default function ImageBlur({ path }) {
	return <LazyLoadImage 
		src={image}
		width={600} height={400}
		effect="blur"
	/>;
}