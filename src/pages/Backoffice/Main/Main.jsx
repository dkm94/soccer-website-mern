/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Card from '../../../components/Dashboard/TopCard/Card';
import { changeModStatus } from '../../../services/queries/admin_queries';
import { getUsers } from '../../../services/queries/public_queries';
// import { getArticles } from '../../../services/queries/public_queries';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { TablePagination, Checkbox, Paper } from '@material-ui/core';
import EnhancedToolBar from '../../../components/Dashboard/Table/Components/EnhancedToolBar';
import ToggleButton from '../../../components/Dashboard/Table/Components/ToggleButton/ToggleButton';
import './Main.css';
import { Typography, styled, useTheme } from '@mui/material';
import LoaderAnimation from '../../../components/Loaders/Animation/Dashboard/LoaderAnimation';

const TitleHeader = styled(Typography)({
  fontSize: '0.8rem',
  fontFamily: "'Adamina', serif !important",
  fontWeight: 'normal',
  padding: '0px !important'
});

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array?.map((el, index) => [el, index]);
//   stabilizedThis?.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis?.map((el) => el[0]);
// }

const Main = ({ cards, drawerWidth }) => {
  const { palette } = useTheme();
  const queryClient = useQueryClient();

  // const [order, setOrder] = useState('asc');
  // const [orderBy, setOrderBy] = useState('name');
  // eslint-disable-next-line no-unused-vars
  const [toggleValue, setToggleValue] = useState(null);
  // const [selectedRows, setSelectedRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedIds, setSelectedIds] = useState([]);

  // const profileId = localStorage.getItem('profileId');

  const {
    isLoading,
    isError,
    data: rows
  } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const mutation = useMutation({
    mutationFn: changeModStatus,
    onMutate: async (updatedObj) => {
      await queryClient.cancelQueries({ queryKey: ['users', updatedObj._id] });
      const previousObj = queryClient.getQueryData(['users', updatedObj._id]);
      queryClient.setQueryData(['users', updatedObj._id], updatedObj._id);

      return { previousObj, updatedObj };
    },
    onError: (err, updatedObj, context) => {
      queryClient.setQueryData(['users', context.updatedObj._id], context.previousObj);
    },
    onSettled: (updatedObj) => {
      queryClient.invalidateQueries({ queryKey: ['users', updatedObj._id] });
    }
  });

  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleDeleteSelected = () => {
    // eslint-disable-next-line no-unused-vars
    const newRows = rows?.filter((row) => !selectedIds?.includes(row._id));
    setSelectedIds([]);
    // TODO: Handle deletion of selected rows
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const newSelectedIds = rows.map((row) => row._id);
      setSelectedIds(newSelectedIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedIds.indexOf(id);
    let newSelectedIds = [];

    if (selectedIndex === -1) {
      newSelectedIds = newSelectedIds.concat(selectedIds, id);
    } else if (selectedIndex === 0) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelectedIds = newSelectedIds.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedIds = newSelectedIds.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }

    setSelectedIds(newSelectedIds);
  };

  const isSelected = (id) => selectedIds.indexOf(id) !== -1;

  // const handleDeleteClick = () => {
  //   console.log('Deleting rows with ids:', selectedRows);
  // };

  const filteredRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleToggle = (user) => {
    const promise = new Promise((resolve, reject) => {
      if (!user) {
        reject('Error user');
      } else {
        resolve('Execute API call next');
      }
    });

    promise
      .then(() => {
        setToggleValue(user._id);
      })
      .then(() => mutation.mutate(user))
      .catch(() => {
        throw new Error('Error mutation');
      });
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        display: 'grid',
        gap: '2rem',
        mt: '2rem'
      }}>
      <Row>
        {cards.map((card, i) => {
          return (
            <Card
              key={card.id}
              title={card.title}
              icon={card.icon}
              collection={card.collection}
              wip={card.wip}
            />
          );
        })}
      </Row>
      <Row>
        <Box sx={{ width: '100%' }}>
          <Paper
            sx={{
              width: '100%',
              mb: 2,
              backgroundColor: palette.white.main,
              borderRadius: '5px 5px 0 0',
              boxShadow: '0px 8px 24px -3px rgba(0,0,0,0.1)',
              opacity: '95%',
              '.MuiPaper-root': { boxShadow: 'none' }
            }}>
            <EnhancedToolBar numSelected={selectedIds.length} />
            {isLoading && <LoaderAnimation />}
            {isError && (
              <Typography variant="body1" style={{ paddingLeft: '3rem' }}>
                Error loading data
              </Typography>
            )}
            {rows && (
              <>
                <div style={{ width: '100%', padding: 'inherit', margin: 0 }}>
                  <table>
                    <thead>
                      <tr className="custom__table-row">
                        <th>
                          <Checkbox
                            indeterminate={
                              selectedIds.length > 0 && selectedIds.length < rows.length
                            }
                            checked={selectedIds.length === rows.length}
                            onChange={handleSelectAll}
                            inputProps={{ 'aria-label': 'select all desserts' }}
                          />
                        </th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Handle</th>
                        <th>Moderator</th>
                        <th>Validated account</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRows?.map((row) => {
                        const isItemSelected = isSelected(row._id);
                        return (
                          <tr tabIndex={-1} key={row._id}>
                            <td>
                              <Checkbox
                                checked={selectedIds.indexOf(row._id) !== -1}
                                onChange={(event) => handleSelectOne(event, row._id)}
                                selected={isItemSelected}
                              />
                            </td>
                            <td>
                              <Typography variant="body1">{row.id_profile?.name}</Typography>
                            </td>
                            <td>
                              <Typography variant="body1">{row.email}</Typography>
                            </td>
                            <td>
                              <Typography variant="body1">{row.id_profile?.handle}</Typography>
                            </td>
                            <td>
                              <ToggleButton
                                value={row.isMod}
                                selected={row.isMod}
                                onChange={() => handleToggle(row)}
                              />
                            </td>
                            <td>
                              <Typography variant="body1">
                                {row.accountValidated ? 'Yes' : 'No'}
                              </Typography>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={rows?.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </Paper>
        </Box>
      </Row>
    </Box>
  );
};

export default Main;
