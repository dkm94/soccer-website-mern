import React from 'react';
import { IconButton, Toolbar, Tooltip, Typography, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'end',
  backgroundColor: theme.palette.black.main,
  color: theme.palette.white.main,
  width: '100%'
  // borderRadius: '5px 5px 0 0'
}));

const TableTitle = styled(Typography)({
  fontSize: '1.5rem',
  // fontFamily: "'Adamina', serif",
  flex: '1 1 100%'
});

const Selected = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  // fontFamily: "'Adamina', serif",
  flex: '1 1 100%',
  color: theme.palette.white.main
}));

const EnhancedToolBar = (props) => {
  const { numSelected } = props;
  const { palette } = useTheme();

  return (
    <CustomToolbar
      sx={{
        padding: '1rem 2rem'
        // ...(numSelected > 0 && {
        //   bgcolor: (theme) =>
        //     alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity)
        // })
      }}>
      {numSelected > 0 ? (
        <Selected variant="body1" component="div">
          {numSelected} selected
        </Selected>
      ) : (
        <TableTitle variant="body1" id="tableTitle" component="div">
          Users
        </TableTitle>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon sx={{ color: palette?.white?.main }} />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon sx={{ color: palette?.white?.main }} />
          </IconButton>
        </Tooltip>
      )}
    </CustomToolbar>
  );
};

export default EnhancedToolBar;
