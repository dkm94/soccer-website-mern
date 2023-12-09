import React from 'react';

import data from './data.json';

import './Banner.css';

const Banner = ({ path }) => {
	const element = path && data.bannerElements[ path ];

	const competitionPage = path && path.startsWith('/competitions');
	const newsPage = path && path.startsWith('/news');

	const competitionsImg = `url("/images/banner${ data.bannerElements[ '/competitions' ].img }")`;
	const newsImg = `url("/images/banner${ data.bannerElements[ '/news' ].img }")`;

	return (
		<div>
			<div
				className="banner"
				style={
					competitionPage
						? {
							backgroundImage: competitionsImg,
							backgroundPosition: 'center',
						}
						: newsPage
							? {
								backgroundImage: newsImg,
								backgroundPosition: 'center',
							}
							: {
								backgroundImage: `url("/images/banner${ element?.img }")`,
								backgroundPosition: 'center',
							}
				}>
				
			</div>
		</div>
	);
};

export default Banner;
