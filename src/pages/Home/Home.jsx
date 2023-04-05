import React, { useState } from 'react';
import usePagination from '../../hooks/usePagination';
import { Col } from 'react-bootstrap';
import { getRessources } from '../../services/soccerapi_services';
import './Home.css';
import '../../App.css';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import Select from '../../components/Select/Competition';
import Results from '../../components/Cards/Results/Results';
import { useQuery } from 'react-query';
import { Pagination, Typography, styled } from '@mui/material';

const StyledContainer = styled('div')({
  padding: '1rem 7rem',
  display: 'grid',
  rowGap: '1rem'
});

const Home = () => {
  const {
    isPending,
    isError,
    data: matches
  } = useQuery({
    queryKey: ['matches'],
    queryFn: () => getRessources('matches')
  });

  const [competition, setCompetition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  let formattedCompetitions = [];
  matches?.forEach((match) => {
    return formattedCompetitions.push({
      id: match?.competition?.code,
      name: match?.competition?.name
    });
  });

  const perPage = 5;
  const _DATA = usePagination(matches, perPage, competition);
  const getCount = () => {
    if (competition) {
      return Math.ceil(_DATA.dataByCompetition().length / perPage);
    } else {
      return Math.ceil(matches?.length / perPage);
    }
  };

  const handleChange = (e, p) => {
    setCurrentPage(p);
    _DATA.jump(p);
  };

  return (
    <Col lg={8}>
      <div className="layout-cols">
        <MainContent title={"Today's games"}>
          <StyledContainer>
            {isPending && <Typography>Loading matches list...</Typography>}
            {isError && <Typography>Error loading matches</Typography>}
            <Select
              competition={competition}
              temp={formattedCompetitions}
              setCompetition={setCompetition}
            />
            {_DATA?.currentData() &&
              _DATA?.currentData().map((match) => <Results key={match?.id} match={match} />)}
            <Pagination count={getCount()} page={currentPage} onChange={handleChange}></Pagination>
          </StyledContainer>
        </MainContent>
      </div>
    </Col>
  );
};

export default Home;
