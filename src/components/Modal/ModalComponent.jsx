import React from 'react';
import AddModeratorModalContent from './Moderators/Forms/AddModeratorModal/AddModeratorModal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import DeleteModModal from './Moderators/Forms/DeleteModModal/DeleteModModal';

const ModalComponent = ({ onClose, component }) => {
  const selectedModal = {
    addMod: <AddModeratorModalContent onClose={onClose} />,
    deleteMod: <DeleteModModal onClose={onClose} />
  };

  return (
    <div className="modal-custom">
      <IconButton onClick={onClose}>
        <CloseIcon color="grey" className="close-icon" />
      </IconButton>
      {component && selectedModal[component]}
    </div>
  );
};

export default ModalComponent;
