import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Col } from 'react-bootstrap';
import { Container, Pagination, styled } from '@mui/material';

import { HomeCardsSkeleton } from 'components/Loaders';
import Message from 'components/Screens/Message';
import { MainContent } from 'components/Layout';
import { CompetitionsSelect } from 'components/ui';
import { ResultsCard } from 'components/Cards';

import { usePagination } from 'utils';
import { getMatchesOfTheDay } from 'services/publicAPIs/soccerapi_services';

import './Home.css';
import '../../App.css';

const SelectWrapper = styled(Container)({
	padding: '0 !important',
	display: 'flex',
	justifyContent: 'flex-end',
	'& div': { width: '15rem' },
});

const Home = () => {
	const {
		isLoading,
		isError,
		error,
		data: result,
	} = useQuery({
		// staleTime: Infinity,
		queryKey: [ 'result?.matches' ],
		queryFn: () => getMatchesOfTheDay(),
	});

	const [ competition, setCompetition ] = useState('');
	const [ currentPage, setCurrentPage ] = useState(1);

	let formattedCompetitions = [];
	result?.matches?.forEach((match) => {
		return formattedCompetitions.push({
			id: match?.competition?.code,
			name: match?.competition?.name,
		});
	});

	const perPage = 5;
	const _DATA = usePagination(result?.matches, perPage, competition);
	const getCount = () => {
		if (competition) {
			return Math.ceil(_DATA.dataByCompetition().length / perPage);
		} else {
			return Math.ceil(result?.matches?.length / perPage);
		}
	};

	const handleChange = (e, p) => {
		setCurrentPage(p);
		_DATA.jump(p);
	};

	return (
		<Col lg={8}>
			<div className="layout-cols">
				<MainContent title={'Today\'s games'}>
					<div className="styled-container">
						{result?.matches?.length === 0 && <Message code={'GAMES_NOT_FOUND'} img={true} />}
						{isError && <Message code={'DEFAULT_ERROR'} img={true} error={error} />}
						{result?.matches && result?.matches?.length > 0 && (
							<SelectWrapper>
								<CompetitionsSelect
									competition={competition}
									temp={formattedCompetitions}
									setCompetition={setCompetition}
								/>
							</SelectWrapper>
						)}
						{isLoading && <HomeCardsSkeleton />}
						{_DATA?.currentData() &&
              _DATA?.currentData().map((match) => <ResultsCard key={match?.id} match={match} />)}
						{!isError && (
							<Pagination
								count={getCount()}
								page={currentPage}
								onChange={handleChange}></Pagination>
						)}
					</div>
				</MainContent>
			</div>
		</Col>
	);
};

export default Home;
