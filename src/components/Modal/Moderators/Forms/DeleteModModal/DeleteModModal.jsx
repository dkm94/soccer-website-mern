import React from 'react';
import ConfirmationModal from '../../../Confirmation/Confirmation';
import { useDeleteMods } from '../../../../../services/mutations/Moderators/useDeleteMods';

const DeleteModModal = ({ onClose, selectedIds }) => {
  const message = 'Supprimer le modérateur';
  const content = 'Êtes-vous sûr de vouloir supprimer cet élément ?';

  const deleteMutation = useDeleteMods();

  const deleteMods = (e) => {
    e.preventDefault();
    deleteMutation.mutate({ _id: selectedIds });
  };

  return (
    <ConfirmationModal onClose={onClose} message={message} content={content} action={deleteMods} />
  );
};

export default DeleteModModal;
