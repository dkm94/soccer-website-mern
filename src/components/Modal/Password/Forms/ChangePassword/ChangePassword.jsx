import React, { useState } from 'react';
import ConfirmationModal from '../../../Confirmation/Confirmation';
import { useUpdatePassword } from '../../../../../services/mutations/Users/useUpdatePassword';

const ChangePwd = ({ onClose, password, newPwd, confirmPwd, id }) => {
  console.log('TOOOOOOOOOOOOC');
  const message = 'Are you sure you want to change your password ?';
  const content = 'Warning : This action is definitive and irreversible';
  const successBtn = 'Saved !';
  const errorBtn = 'Fail !';
  const loadingMessage = 'Saving...';

  const [resultMessage, setResultMessage] = useState(null);

  const mutation = useUpdatePassword(setResultMessage, onClose);

  const { isLoading, isSuccess, isError } = mutation;

  const updatePassword = (e) => {
    console.log(
      '🚀 ~ file: ChangePassword.jsx:6 ~ ChangePwd ~ onClose, password, newPwd, confirmPwd, id:',
      onClose,
      password,
      newPwd,
      confirmPwd,
      id
    );

    e.preventDefault();
    mutation.mutate({ password, newPwd, confirmPwd, _id: id });
  };

  return (
    <ConfirmationModal
      onClose={onClose}
      message={message}
      content={content}
      action={updatePassword}
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

export default ChangePwd;
