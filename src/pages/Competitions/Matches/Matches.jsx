import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Image } from 'react-bootstrap';
import MainContent from '../../../components/Wrappers/MainContent/MainContent';
import { getScoreBoard } from '../../../services/soccerapi_services';
import './Matches.css';
import {
  Typography,
  Paper,
  IconButton,
  InputBase,
  Box,
  FormControl,
  MenuItem,
  Select
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CustomTable from '../../../components/Table/Table';

const Matches = () => {
  const [competition, setCompetition] = useState([]);
  const [selected, setSelected] = useState('ALL');
  const [searchInput, setSerchInput] = useState('');

  const searchFilter = () => {
    const filteredData = competition?.matches.filter((match) => console.log(match));
    return filteredData;
  };

  const setInputValue = (e) => {
    e.preventDefault();
    setSerchInput(e.target.value);
    searchFilter();
  };

  let { code } = useParams();

  const containerStyle = {
    padding: '1rem 3rem'
  };

  useEffect(() => {
    async function getDatas() {
      await getScoreBoard('competitions', code).then((res) => {
        setCompetition(res);
      });
    }
    getDatas();
    setSelected('ALL');
  }, []);

  return (
    <Col lg={8}>
      <div className="layout-cols">
        <MainContent title={`Scoreboard`}>
          <div style={containerStyle}>
            <Row
              xs={12}
              className="g-4"
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem 0'
              }}>
              <Image
                src={competition?.competition?.emblem}
                style={{ height: '10rem', width: 'fit-content' }}
              />
              <div style={{ width: 'fit-content' }} className="scoreboard-header">
                <Typography variant="h2">{competition?.competition?.name}</Typography>
                <Typography variant="h3">Season {competition?.filters?.season}</Typography>
                <Typography variant="h4">
                  Match day {competition?.matches?.[0].season?.currentMatchday}
                </Typography>
              </div>
            </Row>
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
              <Col md={{ span: 4, offset: 4 }} style={{ display: 'flex', justifyContent: 'end' }}>
                <Box sx={{ width: 150 }}>
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      label="Status"
                      defaultValue="ALL">
                      <MenuItem value="ALL">All games</MenuItem>
                      <MenuItem value="FINISHED">Played games</MenuItem>
                      <MenuItem value="SCHEDULED">Scheduled games</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Col>
            </Row>
            <Row xs={12} className="g-4">
              <CustomTable
                matches={competition?.matches}
                searchInput={searchInput}
                selected={selected}
              />
            </Row>
          </div>
        </MainContent>
      </div>
    </Col>
  );
};

export default Matches;