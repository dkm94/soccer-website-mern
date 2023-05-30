/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { IconButton, Toolbar, Box, Tooltip, Typography, Button, useTheme } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { styled } from '@mui/material/styles';
import ConfirmationModal from '../../../Modal/Confirmation/Confirmation';
import AddIcon from '@mui/icons-material/Add';

const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'end',
  width: '100%'
}));

const TableTitle = styled(Typography)({
  fontSize: '1.1rem',
  fontWeight: 600,
  fontFamily: "'Adamina', serif",
  flex: '1 1 100%'
});

const TableSubtitle = styled(Typography)({
  // fontFamily: "'Adamina', serif",
  flex: '1 1 100%'
});

const Selected = styled(Typography)(({ theme }) => ({
  fontSize: '1.1      rem',
  // fontFamily: "'Adamina', serif",
  flex: '1 1 100%'
}));

const AddButton = styled(Button)(({ theme }) => ({
  textTransform: 'unset',
  backgroundColor: theme.palette.blue.main,
  ':hover': {
    backgroundColor: theme.palette.blue.main
  }
}));

const EnhancedToolBar = (props) => {
  const { numSelected } = props;
  const { palette } = useTheme();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const message = 'Supprimer le modérateur';
  const content = 'Êtes-vous sûr de vouloir supprimer cet élément ?';

  return (
    <CustomToolbar
      sx={{
        padding: '1rem 2rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2
      }}>
      <Box sx={{ width: 'fit-content' }}>
        {numSelected > 0 ? (
          <Selected variant="body1" component="div">
            {numSelected} selected
          </Selected>
        ) : (
          <>
            <TableTitle variant="body1" id="tableTitle" component="div">
              Users
            </TableTitle>
            <TableSubtitle variant="body2">
              Manage moderators status, add or delete moderators.
            </TableSubtitle>
          </>
        )}
      </Box>

      <Box sx={{ width: 'fit-content' }}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={handleOpen}>
              <DeleteIcon />
              <ConfirmationModal
                setOpen={setOpen}
                open={open}
                message={message}
                content={content}
              />
            </IconButton>
          </Tooltip>
        ) : (
          // <Tooltip title="Filter list">
          //   <IconButton>
          //     <FilterListIcon sx={{ color: palette?.white?.main }} />
          //   </IconButton>
          // </Tooltip>
          <AddButton variant="contained" startIcon={<AddIcon />}>
            Add new moderator
          </AddButton>
        )}
      </Box>
    </CustomToolbar>
  );
};

export default EnhancedToolBar;
