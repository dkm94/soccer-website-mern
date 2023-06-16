import React, { useState } from 'react';
import usePagination from '../../utils/hooks/usePagination';
import { Col } from 'react-bootstrap';
import { getMatchesOfTheDay } from '../../services/publicAPIs/soccerapi_services';
import './Home.css';
import '../../App.css';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import Select from '../../components/Select/Competition';
import Results from '../../components/Cards/Results/Results';
import { useQuery } from 'react-query';
import { Container, Pagination, styled } from '@mui/material';
import ResultsLoader from '../../components/Loaders/Skeletons/Home/Results/Cards';
import Message from '../../components/Screens/Message';

const StyledContainer = styled('div')({
  padding: '1rem 5rem',
  display: 'grid',
  rowGap: '1rem'
});

const SelectWrapper = styled(Container)({
  padding: '0 !important',
  display: 'flex',
  justifyContent: 'flex-end',
  '& div': {
    width: '15rem'
  }
});

const Home = () => {
  const {
    isLoading,
    isError,
    error,
    data: result
  } = useQuery({
    // staleTime: Infinity,
    queryKey: ['result?.matches'],
    queryFn: () => getMatchesOfTheDay()
  });

  const [competition, setCompetition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  let formattedCompetitions = [];
  result?.matches?.forEach((match) => {
    return formattedCompetitions.push({
      id: match?.competition?.code,
      name: match?.competition?.name
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
        <MainContent title={"Today's games"}>
          <StyledContainer>
            {result?.matches?.length === 0 && <Message code={'GAMES_NOT_FOUND'} img={true} />}
            {isError && <Message code={'DEFAULT_ERROR'} img={true} error={error} />}
            {result?.matches && result?.matches?.length > 0 && (
              <SelectWrapper>
                <Select
                  competition={competition}
                  temp={formattedCompetitions}
                  setCompetition={setCompetition}
                />
              </SelectWrapper>
            )}
            {isLoading && <ResultsLoader />}
            {_DATA?.currentData() &&
              _DATA?.currentData().map((match) => <Results key={match?.id} match={match} />)}
            {!isError && (
              <Pagination
                count={getCount()}
                page={currentPage}
                onChange={handleChange}></Pagination>
            )}
          </StyledContainer>
        </MainContent>
      </div>
    </Col>
  );
};

export default Home;
