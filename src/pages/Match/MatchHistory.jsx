/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Match.css';

import { getMatches } from '../../services/soccerapi_services';
import { Typography, styled, Box } from '@mui/material';

const SubmitButton = styled(Button)({
  backgroundColor: '#2c2f35',
  border: 'none',
  color: ' #FFF',
  height: '100%',
  width: '6rem'
});

const SearchContainer = styled(Container)({
  padding: '0 3rem 3rem 3rem'
});

const SearchBox = styled(Box)({
  backgroundColor: '#EFF1ED',
  padding: '2rem 3rem',
  borderRadius: '5px'
  // boxShadow: '0px 6px 12px -3px rgba(0,0,0,0.1)'
});

const Title = styled(Typography)({
  fontSize: ' 1.3rem',
  padding: ' 2rem 2rem'
});

const MatchHistory = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState({
    status: false,
    message: ''
  });

  const {
    // isPending,
    // error,
    isError,
    isLoading,
    refetch,
    data: matches
  } = useQuery({
    queryKey: ['matches'],
    queryFn: () => getMatches('matches', handleStartDate(startDate), handleEndDate(endDate)),
    enabled: false
  });

  const handleStartDate = (value) => {
    const formatted = value?.toLocaleDateString('en-CA');
    setStartDate(value);
    return formatted;
  };

  const handleEndDate = (value) => {
    const formatted = value?.toLocaleDateString('en-CA');
    setEndDate(value);
    return formatted;
  };

  const searchMatches = () => {
    const diffInMs = new Date(endDate) - new Date(startDate);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    if (!startDate || !endDate) {
      setError({ status: true, message: 'Please fill in all the fields.' });
      return;
    }
    if (startDate > endDate) {
      setError({ status: true, message: 'End date need to be bigger then start date' });
      return;
    }
    if (diffInDays > 10) {
      setError({ status: true, message: 'Specified period must not exceed 10 days.' });
      return;
    }
    setError({ status: false, message: '' });
    refetch();
  };

  console.log(matches);

  return (
    <Col lg={8}>
      <div className="layout-cols">
        {/* {games.map((match) => (
          <Card key={match?.id} className="text-center" style={{ marginTop: '1rem' }}>
            <Card.Header>
              {match.competition.name} / {match.competition.area.name}
            </Card.Header>
            <Card.Body>
              <Container>
                <Row>
                  <Col>
                    <Card.Text>{match.group}</Card.Text>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col xs={4}>
                    <Card.Title>{match.score.fullTime.homeTeam}</Card.Title>
                    <Card.Title>{match.homeTeam.name}</Card.Title>
                  </Col>
                  <Col xs={2}>
                    <Card.Title>
                      <span>-</span>
                    </Card.Title>
                  </Col>
                  <Col xs={4}>
                    <Card.Title>{match.score.fullTime.awayTeam}</Card.Title>
                    <Card.Title>{match.awayTeam.name}</Card.Title>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      Half-time score: {match.score.halfTime.homeTeam} -{' '}
                      {match.score.halfTime.awayTeam}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      Full-time score: {match.score.fullTime.homeTeam} -{' '}
                      {match.score.fullTime.awayTeam}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>
                      {!match.score.extraTime.homeTeam && !match.score.extraTime.awayTeam
                        ? null
                        : `Extra-time score: ${match.score.extraTime.homeTeam} - ${match.score.extraTime.awayTeam}`}
                    </Card.Text>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Card.Text>{match.group}</Card.Text>
                  </Col>
                </Row>
              </Container>
            </Card.Body>
            <Card.Footer className="text-muted">{match.status}</Card.Footer>
          </Card>
        ))} */}
      </div>
      <MainContent title={'Resumed'}>
        <Title variant="h1">Choose a date range to see all matches</Title>

        <SearchContainer>
          <SearchBox>
            <Row>
              <Col>
                <DatePicker
                  showIcon
                  dateFormat="yyyy/MM/dd"
                  selected={startDate}
                  onChange={handleStartDate}
                  placeholderText={'from (yyyy/mm/dd)'}
                  showYearDropdown // year show and scrolldown alos
                  scrollableYearDropdown
                />
              </Col>
              <Col>
                <DatePicker
                  showIcon
                  dateFormat="yyyy/MM/dd"
                  selected={endDate}
                  onChange={handleEndDate}
                  placeholderText={'to (yyyy/mm/dd)'}
                  showYearDropdown // year show and scrolldown alos
                  scrollableYearDropdown
                />
              </Col>
              <Col style={{ textAlign: 'end' }}>
                <SubmitButton onClick={searchMatches}>Search</SubmitButton>
              </Col>
            </Row>
          </SearchBox>
        </SearchContainer>
        <Container>
          {error?.status === true ? (
            <Typography variant="body1">{error?.message}</Typography>
          ) : null}
          {isError && <Typography variant="body1">{error?.response?.message?.data}</Typography>}
          {isLoading && <Typography variant="body1">Loading data</Typography>}
          {matches?.length === 0 ? (
            <Typography variant="body1">No games to display for this period</Typography>
          ) : (
            matches?.map((match) => <span key={match.id}>{match.id}</span>)
          )}
        </Container>
      </MainContent>
    </Col>
  );
};

export default MatchHistory;
