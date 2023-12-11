import React from 'react';

import data from './data.json';

import './Banner.css';
import { ImageWithText } from 'components/ui';

const Banner = ({ path }) => {
	const element = path && data.bannerElements[ path ];

	// const competitionPage = path && path.startsWith('/competitions');
	// const newsPage = path && path.startsWith('/news');

	const competitionPage = path && path.startsWith('/competitions');
	const newsPage = path && path.startsWith('/news');

	// const competitionsImg = `url("/images/banner${ data.bannerElements[ '/competitions' ].img }")`;
	// const newsImg = `url("/images/banner${ data.bannerElements[ '/news' ].img }")`;

	const competitionsImg = `/images/banner${ data.bannerElements[ '/competitions' ].img }`;
	const newsImg = `/images/banner${ data.bannerElements[ '/news' ].img }`;

	const returnPicture = () => {
		if (competitionPage) {
			return competitionsImg;
		} else if (newsPage) {
			return newsImg;
		} else {
			return `/images/banner${ element?.img }`;
		}
	};

	const returnTitle = () => {
		if (competitionPage) {
			return data.bannerElements[ '/competitions' ].title;
		} else if (newsPage) {
			return data.bannerElements[ '/news' ].title;
		} else {
			return element?.title;
		}
	}

	return (
		<div className="banner-wrapper">
			<ImageWithText imageUrl={returnPicture()} text={returnTitle()}/>
		</div>
	);
};

export default Banner;
