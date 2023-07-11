import { useQuery } from 'react-query';

import { Banner } from 'components/Layout';
import { CarouselWrapper } from 'components/slider';

import { getArticles } from 'services/queries/public_queries';

import './Header.css';

const Header = ({ path }) => {
	const {
		data: articles,
		isError,
		isLoading,
	} = useQuery({
		queryKey: [ 'articles' ],
		queryFn: getArticles,
	});
	
	const featuredContent = articles?.filter((article) => article.featured);

	return <>{path === '/' || path === '/home' ? <CarouselWrapper articles={featuredContent} /> : <Banner path={path} />}</>;
};

export default Header;
