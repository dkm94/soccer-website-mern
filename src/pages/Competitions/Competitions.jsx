/* eslint-disable no-unused-vars */
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { styled } from '@mui/material';

import { CompetitionCard } from 'components/Cards';
import { MainContent } from 'components/Layout';
import { CompetitionsSkeleton } from 'components/Loaders';
import Message from 'components/Screens/Message';

import { getCompetitions } from 'services/publicAPIs/soccerapi_services';

import './Competition.css';

const StyledContainer = styled('div')({ padding: '1rem 0' });

const Competition = () => {
	const { isLoading, isError, error, data } = useQuery({
		queryKey: [ 'competitions' ],
		queryFn: () => getCompetitions(),
	});

	const competitions = data?.competitions;

	return (
		<Col lg={8}>
			<div className="layout-cols">
				<MainContent title={'All competitions'}>
					<StyledContainer>
						{isError && <Message error={error} img={true} />}
						{isLoading && <CompetitionsSkeleton />}
						{competitions && (
							<div
								// xs={1}
								// md={2}
								// lg={4}
								// className="g-4"
								// style={{ padding: '1rem 0' }}
								style={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: '10px',
									justifyContent: 'center',
								}}
							>
								{competitions?.map((competition) => (
									<CompetitionCard key={competitions?.id} competition={competition} />
								))}
							</div>
						)}
					</StyledContainer>
				</MainContent>
			</div>
		</Col>
	);
};

export default Competition;
