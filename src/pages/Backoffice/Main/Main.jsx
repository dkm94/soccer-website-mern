import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Box';
import Card from '../../../components/Dashboard/TopCard/Card';
import { getUsers } from '../../../services/queries/admin_queries';
import { useQuery } from 'react-query';
import { Checkbox, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import Tablehead from '../../../components/Dashboard/Table/Components/TableHead/TableHead';
import EnhancedToolBar from '../../../components/Dashboard/Table/Components/EnhancedToolBar';
import headCells from '../../../components/Dashboard/Table/data/headcells';
import "./Main.css";
import ToggleComponent from '../../../components/Dashboard/Table/Components/ToggleButton/ToggleButton';
import ToggleButton from '../../../components/Dashboard/Table/Components/ToggleButton/ToggleButton';

function createData(name, email, isMod, isActivated, nbOfArticles) {
  return {
    name,
    email,
    isMod,
    isActivated,
    nbOfArticles,
  };
}

const rows1 = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis?.map((el) => el[0]);
}

const Main = ({ cards, drawerWidth }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data: rows, error, isError, isLoading } = useQuery(['users'], getUsers);

  // const [isActive, setIsActive] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected?.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected?.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected?.concat(selected?.slice(1));
    } else if (selectedIndex === selected?.length - 1) {
      newSelected = newSelected?.concat(selected?.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected?.concat(
        selected?.slice(0, selectedIndex),
        selected?.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected?.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
  return (
    <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, display: "grid", gap: "2rem", mt: "2rem" }}
      >
        <Row>
          {cards.map((card, i) => {
            return <Card key={i} title={card.title} icon={card.icon} collection={card.collection} wip={card.wip} />
          })}
        </Row>
        <Row>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, backgroundColor: "#FFF" }}>
              <EnhancedToolBar numSelected={selected.length} />
              <TableContainer>
                <Table
                  sx={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                >
                  <Tablehead
                    numSelected={selected?.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows?.length}
                    headCells={headCells}
                  />
                  <TableBody>
                    {stableSort(rows, getComparator(order, orderBy))
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      ?.map((row, index) => {
                        console.log(">>>", row);
                        const isItemSelected = isSelected(row?.name);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row?.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row?._id}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId,
                                }}
                              />
                            </TableCell>
                            {/* <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {row?.name}
                            </TableCell> */}
                            <TableCell 
                              component="th"
                              id={labelId}
                              scope="row"
                              // padding="none"

                            >{row?.id_profile?.name}</TableCell>
                            <TableCell>{row?.email}</TableCell>
                            <TableCell>
                              {/* <div className="toggle-button-cover">
                                <div className="button-cover">
                                  <div className="button r" id="button-1">
                                    <input type="checkbox" className="checkbox" />
                                    <div className="knobs"></div>
                                    <div className="layer"></div>
                                  </div>
                                </div>
                              </div> */}
                              <ToggleButton
                                // isActive={isActive}
                                // setIsActive={setIsActive}
                                isMod={row?.isMod}
                              />
                            </TableCell>
                            <TableCell>{row?.isActivated}</TableCell>
                            <TableCell>{row?.number_of_articles}</TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination 
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
          {/* <Table 
            users={users} 
            error={error} 
            isError={isError} 
            isLoading={isLoading} 
          /> */}
        </Row>
      </Box>
  )
}

export default Main