import React, { useState, useEffect } from 'react';
import { Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import Card from '../../../components/Dashboard/TopCard/Card';
import { getUsers } from '../../../services/queries/admin_queries';
import { getArticles } from '../../../services/queries/public_queries';
import { useQuery } from 'react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  IconButton,
  Button,
  Paper,
  FormControlLabel,
  Switch,
  ToggleButtonGroup
} from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import EnhancedToolBar from '../../../components/Dashboard/Table/Components/EnhancedToolBar';
import headCells from '../../../components/Dashboard/Table/data/headcells';
import ToggleButton from '../../../components/Dashboard/Table/Components/ToggleButton/ToggleButton';
import "./Main.css";
import { Typography } from '@mui/material';

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
  const profileId = localStorage.getItem("profileId")
  const { data: rows, error, isError, isLoading } = useQuery(['users'], getUsers);
  console.log("🚀 ~ file: Main.jsx:52 ~ Main ~ rows:", rows)
  const { data: articles, error_articles, isError_articles, isLoading_articles } = useQuery(['articles'], getArticles);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  ////
  const [selectedIds, setSelectedIds] = useState([]);


  const handleDeleteSelected = () => {
    const newRows = rows?.filter((row) => !selectedIds?.includes(row._id));
    setSelectedIds([]);
    // TODO: Handle deletion of selected rows

  };


    ////

  const [selectedRows, setSelectedRows] = React.useState([]);

  // const handleRowSelect = (event, row) => {
  //   console.log("🚀 ~ file: Main.jsx:167 ~ handleRowSelect ~ row:", row)
    
  //   if (event.target.checked) {
  //     setSelectedRows(prevSelected => [...prevSelected, row._id]);
  //   } else {
  //     setSelectedRows(prevSelected => prevSelected.filter(id => id !== row._id));
  //   }
  // };

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
        selectedIds.slice(selectedIndex + 1),
      );
    }

    setSelectedIds(newSelectedIds);
  };

  const isSelected = (id) => selectedIds.indexOf(id) !== -1;

  const handleDeleteClick = () => {
    console.log("Deleting rows with ids:", selectedRows);
  };

  const filteredRows = rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const [switchValue, setSwitchValue] = React.useState(null);

  function handleSwitchChange (e, obj) {
    e.preventDefault();
    console.log(obj);
    // Add actions here for when the switch is triggered
  };
  
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
            <Paper sx={{ width: '100%', mb: 2, backgroundColor: "#FFF", opacity: "95%", 
          ".MuiPaper-root": { boxShadow: "none"} }}>
              <EnhancedToolBar numSelected={selected.length} />
              {/* <MyTable rows={users} /> */}
              {/* <TableContainer>
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
                        const isItemSelected = isSelected(row?._id);
                        console.log("🚀 ~ file: Main.jsx:134 ~ ?.map ~ row:", row)
                        const labelId = `enhanced-table-checkbox-${index}`;
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row?._id)}
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
                            <TableCell 
                              component="th"
                              id={labelId}
                              scope="row"
                              // padding="none"

                            >{row?.id_profile?.name}</TableCell>
                            <TableCell>{row?.email}</TableCell>
                            <TableCell>
                              <ToggleButton
                                // isActive={isActive}
                                // setIsActive={setIsActive}
                                isMod={row?.isMod}
                              />
                            </TableCell>
                            <TableCell>{row?.accountValidated ? "Enabled" : "Not enabled"}</TableCell>
                            <TableCell>
                            {articles?.map(article => {
                              console.log(rows?.find(({ id_profile }) => id_profile._id === article._id));
                              return rows?.find(({ id_profile }) => id_profile._id === article._id)
                            }
                            )}
                            </TableCell>
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
              </TableContainer> */}
              {rows && <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length}
                          checked={selectedIds.length === rows.length}
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      {/* {Object?.keys(rows[0])
                        ?.filter((key) => key !== "_id" && key !== "id_profile")
                        ?.map((key) => (
                          <TableCell key={key}>{key}</TableCell>
                        ))} */}
                      <TableCell>
                        <Typography variant='h6'>Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='h6'>Email</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='h6'>Handle</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='h6'>Is moderator</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant='h6'>Validated account</Typography>
                      </TableCell>
                      <TableCell padding="checkbox">
                        <IconButton onClick={handleDeleteSelected}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  {/* <TableBody>
                    {rows?.map((row) => (
                      <TableRow key={row._id}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedIds?.indexOf(row._id) !== -1}
                            onChange={(event) => handleSelectOne(event, row._id)}
                          />
                        </TableCell>
                        {Object?.entries(row)
                          ?.filter(([key]) => key !== "_id" && key !== "id_profile")
                          ?.map(([key, value]) => (
                            <TableCell key={key}>{value}</TableCell>
                          ))}
                        <TableCell padding="checkbox">
                          <Button variant="outlined">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody> */}
                  <TableBody>
                    {filteredRows.map((row, i) => {
                    const isItemSelected = isSelected(row._id);
                    return (
                      <TableRow key={row._id} hover onClick={(event) => handleSelectOne(event, row._id)} selected={isItemSelected}>
                        <TableCell padding="checkbox">
                          <Checkbox
                            indeterminate={selectedIds.length > 0 && selectedIds.length < rows.length}
                            checked={selectedIds.length === rows.length}
                            onChange={handleSelectAll}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1'>{row.id_profile?.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1'>{row.email}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1'>{row.id_profile?.handle}</Typography>
                        </TableCell>
                        <TableCell>
                            {/* <ToggleButton key={i} defaultValue={row.isMod}>Yes</ToggleButton> */}
                            <FormControlLabel
                              control={
                                <Switch
                                  checked={row.isMod}
                                  name={`isMod-${row._id}`}
                                  color="primary"
                                  onClick={(e) => handleSwitchChange(e, row)}
                                />
                              }
                              label=""
                            />
                        </TableCell>
                        <TableCell>
                          <Typography variant='body1'>{row.accountValidated ? "Yes" : "No"}</Typography>
                        </TableCell>
                      </TableRow>
                    )})}
                  </TableBody>
                </Table>
              </TableContainer>
}
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
        </Row>
      </Box>
  )
}

export default Main