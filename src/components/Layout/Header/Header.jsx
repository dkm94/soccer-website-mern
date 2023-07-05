import { Banner } from 'components/Layout';
import { CarouselWrapper } from 'components/slider';

import './Header.css';

const Header = ({ path }) => {
	return <>{path === '/' || path === '/home' ? <CarouselWrapper /> : <Banner path={path} />}</>;
};

export default Header;
