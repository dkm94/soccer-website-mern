import * as React from 'react';
import { styled, useTheme } from '@mui/system';
import TablePaginationUnstyled, {
  tablePaginationUnstyledClasses as classes
} from '@mui/base/TablePaginationUnstyled';
import { Image } from 'react-bootstrap';
import status from '../../data/status.json';

const Container = styled('div')`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border-bottom: 1px solid #ddd;
    text-align: left;
    padding: 8px;
    // fontfamily: "'Adamina', serif";
  }

  th {
    background-color: #ddd;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .${classes.toolbar} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .${classes.selectLabel} {
    margin: 0;
  }

  & .${classes.displayedRows} {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .${classes.spacer} {
    display: none;
  }

  & .${classes.actions} {
    display: flex;
    gap: 0.25rem;

    button {
      background-color: 'blue' !important;
    }
  }
`;

export default function CustomTable({ matches, searchInput, selected }) {
  const { palette } = useTheme();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  function createData(id, date, htCrest, homeTeam, atCrest, awayTeam, score, status) {
    return { id, date, htCrest, homeTeam, atCrest, awayTeam, score, status };
  }

  const apiData = () => {
    const data = matches?.map(({ id, awayTeam, homeTeam, score, status, utcDate }) =>
      createData(
        id,
        utcDate,
        homeTeam?.crest,
        homeTeam?.shortName,
        awayTeam?.crest,
        awayTeam?.shortName,
        score,
        status
      )
    );
    return data;
  };

  const lowercasedFilter = searchInput?.toLowerCase();
  const rows = apiData()
    ?.sort((a, b) => new Date(a?.utcDate) - new Date(b?.utcDate))
    .filter((item) =>
      Object.keys(item).some((key) =>
        item[key]?.toString()?.toLowerCase()?.includes(lowercasedFilter)
      )
    )
    .filter((match) => {
      switch (selected) {
        case 'FINISHED':
          return match?.status === 'FINISHED';
        case 'SCHEDULED':
          return match?.status === 'SCHEDULED';
        case 'TIMED':
          return match?.status === 'TIMED';
        default:
          return match;
      }
    });

  const rowsTitles = ['Date', '', 'Hometeam', '', 'Away team', 'Score'];

  const formatDate = (date) => {
    let getDate = new Date(date);
    return getDate.toLocaleDateString('en-US');
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container sx={{ width: '100%', padding: 0, margin: 0 }}>
      <table>
        <thead>
          <tr>{rowsTitles && rowsTitles?.map((row) => <th key={row}>{row}</th>)}</tr>
        </thead>
        <tbody>
          {(rowsPerPage > 0
            ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          )?.map((row) => (
            <tr key={row?.id}>
              <td align="left">{formatDate(row?.date)}</td>
              <td style={{ borderRight: '0' }}>
                <Image style={{ height: '32px', width: '32px' }} src={row?.htCrest} />
              </td>
              <td style={{ textAlignLast: 'left' }}>{row?.homeTeam}</td>
              <td>
                <Image style={{ height: '32px', width: '32px' }} src={row?.atCrest} />
              </td>
              <td style={{ textAlignLast: 'left' }}>{row?.awayTeam}</td>
              {row?.status === 'FINISHED' ? (
                <td>{`${row?.score?.fullTime?.home} - ${row?.score?.fullTime?.away}`}</td>
              ) : row?.status === 'IN_PLAY' ? (
                <td
                  style={{
                    color: palette.green.main
                  }}>{`${row?.score?.halfTime?.home} - ${row?.score?.halfTime?.away}`}</td>
              ) : row?.status === 'PAUSED' ? (
                <td
                  style={{
                    color: palette.green.main
                  }}>{`${row?.score?.fullTime?.home} - ${row?.score?.fullTime?.away}`}</td>
              ) : (
                <td>{status[row?.status].title}</td>
              )}
            </tr>
          ))}

          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>
        {matches && (
          <tfoot>
            <tr>
              <CustomTablePagination
                sx={{
                  '& .MuiTablePagination-actions button': {
                    borderStyle: 'unset',
                    borderRadius: '3px'
                  }
                }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    'aria-label': 'rows per page'
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true
                  }
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        )}{' '}
      </table>
    </Container>
  );
}
