/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { createMod } from '../../queries/admin_queries';

export const useCreateMod = (
  setSuccessMessage,
  setOpenSuccess,
  setOpenError,
  setError,
  setTempForm,
  setEmail,
  setName,
  onClose
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createMod,
    onError: (error, newObject, context) => {
      const errorObject = error.response.data;
      setOpenError(true);
      setTempForm(newObject);
      setError(errorObject);
    },
    onSuccess: (data, variables, context) => {
      const { success } = data;
      if (success) {
        queryClient.invalidateQueries('users'); // actualiser la liste

        setOpenSuccess(true);
        setSuccessMessage('Saved !');
        setEmail('');
        setName('');
        setTimeout(() => {
          onClose();
        }, [2000]);
      }
    }
  });
};
