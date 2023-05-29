/* eslint-disable no-unused-vars */
import { useMutation } from 'react-query';
import { createMod } from '../../queries/admin_queries';

export const useCreateMod = (
  setSuccessMessage,
  setOpenSuccess,
  setOpenError,
  setError,
  setTempForm,
  setEmail,
  setName
) => {
  return useMutation({
    mutationFn: createMod,
    onError: (error, newObject, context) => {
      const errorObject = error.response.data;
      setOpenError(true);
      setTempForm(newObject);
      setError(errorObject);
    },
    onSuccess: (data, variables, context) => {
      const { message } = data;
      setOpenSuccess(true);
      setSuccessMessage(message);
      setEmail('');
      setName('');
    }
  });
};
