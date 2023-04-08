/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import CustomTable from '../../components/Table/Table';
import { Row, Col, Button } from 'react-bootstrap';
import { useQuery } from 'react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Match.css';

import { getMatches } from '../../services/soccerapi_services';
import { Typography, styled, Box, Paper, InputBase, IconButton, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SubmitButton = styled(Button)({
  backgroundColor: '#2c2f35',
  border: 'none',
  color: ' #FFF',
  height: '100%',
  width: '6rem',
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: '#fffcfc',
    color: '#2c2f35',
    border: '1px solid #2c2f35'
  }
});

const DatePickerWrapper = styled(Container)({
  // padding: '0 3rem 3rem 3rem'
});

const SearchWrapper = styled(Container)({
  marginTop: '4rem',
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'end'
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

const TableWrapper = styled(Container)({});

const MatchHistory = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState({
    status: false,
    message: ''
  });
  const [selected, setSelected] = useState('ALL');
  const [searchInput, setSerchInput] = useState('');

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

  const searchFilter = () => {
    const filteredData = matches?.filter((match) => console.log(match));
    return filteredData;
  };

  const setInputValue = (e) => {
    e.preventDefault();
    setSerchInput(e.target.value);
    searchFilter();
  };

  console.log(matches);

  return (
    <Col lg={8}>
      <div className="layout-cols"></div>
      <MainContent title={'Resumed'}>
        <Title variant="h1">Choose a date range to see all matches</Title>

        <DatePickerWrapper>
          <SearchBox>
            <Row style={{ marginBottom: '1rem' }}>
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
            {error?.status === true ? (
              <Typography variant="body1" color={'red'}>
                {error?.message}
              </Typography>
            ) : null}
          </SearchBox>
        </DatePickerWrapper>
        <SearchWrapper>
          <Row xs={12} className="g-4">
            <Col md={4}>
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 250
                }}>
                <InputBase
                  size="small"
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search team"
                  inputProps={{ 'aria-label': 'Search team' }}
                  value={searchInput}
                  onChange={setInputValue}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" disabled>
                  <SearchIcon />
                </IconButton>
              </Paper>
            </Col>
          </Row>
        </SearchWrapper>
        <TableWrapper>
          {isError && <Typography variant="body1">{error?.response?.message?.data}</Typography>}
          {isLoading && <Typography variant="body1">Loading data</Typography>}
          {matches?.length === 0 && (
            <Typography variant="body1">No games to display for this period</Typography>
          )}
          <Row xs={12} className="g-4">
            <CustomTable matches={matches} searchInput={searchInput} selected={selected} />
          </Row>
        </TableWrapper>
      </MainContent>
    </Col>
  );
};

export default MatchHistory;
