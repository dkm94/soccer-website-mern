/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { editProfile } from '../../queries/common_queries';

export const useEditProfile = (
  setSuccessMessage,
  setOpenSuccess,
  setOpenError,
  setErrorMessage,
  setTempForm,
  setErrorObj,
  setFilename
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editProfile,
    onMutate: async (updatedObj) => {
      await queryClient.cancelQueries({ queryKey: ['profiles', updatedObj._id] });
      const previousObj = queryClient.getQueryData(['profiles', updatedObj._id]);
      queryClient.setQueryData(['profiles', updatedObj._id], updatedObj._id);

      return { previousObj, updatedObj };
    },
    onError: (error, updatedObj, context) => {
      const errorObject = error.response.data;
      setOpenError(true);
      setTempForm(updatedObj);
      setErrorMessage(errorObject.error.message);
      setErrorObj(errorObject);
      queryClient.setQueryData(['profiles', context.updatedObj._id], context.previousObj);
    },
    onSettled: (updatedObj) => {
      queryClient.invalidateQueries({ queryKey: ['profiles', updatedObj?._id] });
    },
    onSuccess: (data, variables) => {
      setFilename('');
      setOpenSuccess(true);
      setSuccessMessage(data);
    }
  });
};
