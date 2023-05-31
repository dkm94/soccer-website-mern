import React, { useState } from 'react';
import ConfirmationModal from '../../../Confirmation/Confirmation';
import { useDeleteMods } from '../../../../../services/mutations/Moderators/useDeleteMods';

const DeleteModModal = ({ onClose, selectedIds, setSelectedIds }) => {
  const message = 'Delete moderator(s)';
  const content = 'Are you sure to delete this/these user(s) ?';
  const successBtn = 'Deleted !';
  const errorBtn = 'Fail !';
  const loadingMessage = 'Deleting...';

  const [resultMessage, setResultMessage] = useState(null);

  const deleteMutation = useDeleteMods(setResultMessage, setSelectedIds, onClose);

  const { isLoading, isSuccess, isError } = deleteMutation;

  const deleteMods = (e) => {
    e.preventDefault();
    deleteMutation.mutate({ _id: selectedIds });
  };

  return (
    <ConfirmationModal
      onClose={onClose}
      message={message}
      content={content}
      action={deleteMods}
      successBtn={successBtn}
      errorBtn={errorBtn}
      resultMessage={resultMessage}
      loadingMessage={loadingMessage}
      isLoading={isLoading}
      isSuccess={isSuccess}
      isError={isError}
    />
  );
};

export default DeleteModModal;
