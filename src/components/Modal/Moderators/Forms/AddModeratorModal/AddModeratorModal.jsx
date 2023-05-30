import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import AddMod from '../../../../../pages/Backoffice/Moderators/Forms/AddMod/AddMod';

const AddModeratorModalContent = ({ onClose }) => {
  return (
    <div className="modal-custom">
      <IconButton onClick={onClose}>
        <CloseIcon color="grey" className="close-icon" />
      </IconButton>
      <AddMod onClose={onClose} />
    </div>
  );
};

export default AddModeratorModalContent;
