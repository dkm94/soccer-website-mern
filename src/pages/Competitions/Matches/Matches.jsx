import React, { useState } from 'react';
import { Col, Row, Image } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Paper,
	IconButton,
	InputBase,
	Box,
	FormControl,
	MenuItem,
	Select,
	Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';

import { MainContent } from 'components/Layout';
import { MatchesLoader } from 'components/Loaders';
import { MatchTable } from 'components/tables';

import { getScoreBoard } from 'services/publicAPIs/soccerapi_services';

import './Matches.css';

const Wrapper = styled(Container)({ padding: '1rem 3rem' });

const Matches = () => {
	let { code } = useParams();
	const {
		isLoading,
		// isError,
		data: competition,
	} = useQuery({
		queryKey: [ 'competitions' ],
		queryFn: () => getScoreBoard(code),
	});

	const [ selected, setSelected ] = useState('ALL');
	const [ searchInput, setSerchInput ] = useState('');

	const searchFilter = () => {
		const filteredData = competition?.matches.filter((match) => match);
		return filteredData;
	};

	const setInputValue = (e) => {
		e.preventDefault();
		setSerchInput(e.target.value);
		searchFilter();
	};

	return (
		<Col lg={8}>
			<div className="layout-cols">
				<MainContent title={'Scoreboard'}>
					{isLoading && <MatchesLoader />}
					{competition && (
						<Wrapper className="matches-wrapper">
							<Row
								xs={12}
								style={{
									display: 'flex',
									flexDirection: 'row',
									justifyContent: 'center',
									alignItems: 'center',
									padding: '3rem 0',
									flexWrap: 'unset',
									// width: 'max-content',
								}}>
								<div className="scoreboard-header__img">
									<Image
										src={competition?.competition?.emblem}
										style={{
											height: '100px',
											width: 'fit-content', 
										}}
									/>
								</div>
								<div className="scoreboard-header">
									<span id="name">{competition?.competition?.name}</span>
									<span id="season">Season {competition?.filters?.season}</span>
									<span id="matchday">
                    Match day {competition?.matches?.[ 0 ].season?.currentMatchday}
									</span>
								</div>
							</Row>
							<Row xs={12} style={{
								alignItems: 'center',
								marginBottom: '2rem', 
							}}>
								<Col md={6}>
									<Paper
										component="form"
										sx={{
											p: '2px 4px',
											display: 'flex',
											alignItems: 'center',
											width: 250,
										}}>
										<InputBase
											size="small"
											sx={{
												ml: 1,
												flex: 1, 
											}}
											placeholder="Search team"
											inputProps={{ 'aria-label': 'Search team' }}
											value={searchInput}
											onChange={setInputValue}
										/>
										<IconButton type="button" sx={{ p: '5px' }} aria-label="search" disabled>
											<SearchIcon />
										</IconButton>
									</Paper>
								</Col>
								<Col md={6} style={{
									display: 'flex',
									justifyContent: 'end', 
								}}>
									<Box sx={{ width: 150 }}>
										<FormControl sx={{
											m: 1,
											minWidth: 120, 
										}} size="small">
											<Select
												value={selected}
												onChange={(e) => setSelected(e.target.value)}
												displayEmpty
												inputProps={{ 'aria-label': 'Without label' }}
												label="Status"
												defaultValue="ALL">
												<MenuItem value="ALL">All games</MenuItem>
												<MenuItem value="FINISHED">Completed games</MenuItem>
												<MenuItem value="TIMED">Timed games</MenuItem>
												<MenuItem value="SCHEDULED">Scheduled games</MenuItem>
											</Select>
										</FormControl>
									</Box>
								</Col>
							</Row>
							<Row xs={12}>
								<MatchTable
									matches={competition?.matches}
									searchInput={searchInput}
									selected={selected}
								/>
							</Row>
						</Wrapper>
					)}
				</MainContent>
			</div>
		</Col>
	);
};

export default Matches;
