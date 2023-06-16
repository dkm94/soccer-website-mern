/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import MainContent from '../../components/Wrappers/MainContent/MainContent';
import CustomTable from '../../components/Table/Table';
import { Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Match.css';

import { getMatches } from '../../services/publicAPIs/soccerapi_services';
import {
  Typography,
  styled,
  Box,
  Paper,
  InputBase,
  IconButton,
  Container,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LoaderAnimation from '../../components/Loaders/Animation/Dashboard/LoaderAnimation';
import Message from '../../components/Screens/Message';

const SubmitButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.black.main,
  border: 'none',
  textTransform: 'unset',
  transition: 'background-color 0.3s',
  ':hover': {
    backgroundColor: theme.palette.white.main,
    color: theme.palette.black.light,
    border: `1px solid ${theme.palette.black.main}`
  }
}));

const DatePickerWrapper = styled(Container)({
  marginTop: '3rem'
});

const SearchWrapper = styled(Container)({
  marginTop: '4rem',
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'end'
});

const SearchBox = styled(Box)({
  // padding: '2rem 3rem',
  borderRadius: '5px'
  // boxShadow: '0px 6px 12px -3px rgba(0,0,0,0.1)'
});

const Title = styled(Typography)({
  fontSize: ' 1rem',
  paddingTop: ' 2rem'
});

const TableHeader = styled(Container)(({ theme }) => ({
  backgroundColor: theme.palette.black.main,
  color: theme.palette.white.main,
  width: '100%',
  padding: '1rem 1rem 3rem 1.5rem',
  borderRadius: '5px 5px 0 0'
}));

const TableTitle = styled(Typography)({
  fontSize: '2rem',
  fontFamily: "'Adamina', serif"
});

const TableSubtitle = styled(Typography)({
  // fontSize: '1.1rem'
});

const TableWrapper = styled(Container)({});

const MatchHistory = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [error, setError] = useState({
    status: false,
    message: ''
  });
  const selected = 'ALL';
  const [searchInput, setSerchInput] = useState('');

  const {
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

  return (
    <Col lg={8}>
      <div className="layout-cols"></div>
      <MainContent title={'Search'}>
        <DatePickerWrapper>
          <SearchBox>
            <Row
              style={{
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <Col>
                <DatePicker
                  showIcon
                  dateFormat="yyyy/MM/dd"
                  selected={startDate}
                  onChange={handleStartDate}
                  placeholderText={'from (yyyy/mm/dd)'}
                  showYearDropdown
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
                  showYearDropdown
                  scrollableYearDropdown
                />
              </Col>
              <Col>
                <SubmitButton onClick={searchMatches} variant="contained">
                  Search
                </SubmitButton>
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
          {isError && <Message code={'DEFAULT_ERROR'} img={true} />}
          <Row xs={12} className="g-4">
            <TableHeader>
              <TableTitle variant="body1">Results</TableTitle>
              {matches && (
                <TableSubtitle variant="body2">{`From ${startDate?.toLocaleDateString(
                  'en-CA'
                )} to ${endDate?.toLocaleDateString('en-CA')}`}</TableSubtitle>
              )}
            </TableHeader>

            <CustomTable matches={matches} searchInput={searchInput} selected={selected} />
          </Row>
        </TableWrapper>
        {isLoading && <LoaderAnimation />}
        {matches?.length === 0 && <Message code={'DATA_NOT_FOUND'} img={true} />}
      </MainContent>
    </Col>
  );
};

export default MatchHistory;
