import React from 'react';
import ConfirmationModal from '../../../Confirmation/Confirmation';

const DeleteModModal = ({ onClose }) => {
  const message = 'Supprimer le modérateur';
  const content = 'Êtes-vous sûr de vouloir supprimer cet élément ?';

  const deleteMod = () => {
    console.log('triggered');
  };

  return (
    <ConfirmationModal onClose={onClose} message={message} content={content} action={deleteMod} />
  );
};

export default DeleteModModal;
