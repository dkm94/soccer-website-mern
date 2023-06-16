import React from 'react';
import './MatchesLoader.css';
import { Container, Box, styled } from '@mui/material';

const MatchesLoader = () => {
  const HeaderWrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'row',
    marginTop: '3rem',
    width: '80%'
  });
  const Header = styled(Container)({
    display: 'grid',
    alignItems: 'center'
  });
  const SearchWrapper = styled(Container)({
    marginTop: '3rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  });
  const TableWrapper = styled('table')({
    display: 'table'
  });
  return (
    <Box
      sx={{
        display: 'grid',
        rowGap: '2rem'
      }}>
      <HeaderWrapper className="g-4 wrapper">
        <div id="match-img" className="load" />
        <Header>
          <div id="match-name" className="load" />
          <div id="match-season" className="load" />
          <div id="match-matchday" className="load" />
        </Header>
      </HeaderWrapper>
      <SearchWrapper className="g-4 wrapper">
        <div className="load" id="match-search-input" />
        <div className="load" id="match-select" />
      </SearchWrapper>
      <TableWrapper className="g-4 wrapper loader-table">
        <tr id="match-table-header">
          <th>Date</th>
          <th>Hometeam</th>
          <th>Away team</th>
          <th>Score</th>
        </tr>
        {Array(5).fill(
          <tr>
            <td>
              <div className="loader-table-cellule load" />
            </td>
            <td>
              <div className="loader-table-cellule load" />
            </td>
            <td>
              <div className="loader-table-cellule load" />
            </td>
            <td>
              <div className="loader-table-cellule load" />
            </td>
          </tr>
        )}
      </TableWrapper>
    </Box>
  );
};

export default MatchesLoader;
