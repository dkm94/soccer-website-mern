/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { deleteMods } from '../../queries/admin_queries';

export const useDeleteMods = (
  setSuccessMessage,
  setOpenSuccess,
  setOpenError,
  setErrorMessage,
  setErrorObj
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMods,
    onMutate: async (deletedObj) => {
      await queryClient.cancelQueries({ queryKey: ['users', deletedObj._id] });
      const previousObj = queryClient.getQueryData(['users', deletedObj._id]);
      queryClient.setQueryData(['users', deletedObj._id], deletedObj._id);

      return { previousObj, deletedObj };
    },
    onError: (error, deletedObj, context) => {
      const errorObject = error.response.data;

      setOpenError(true);
      setErrorMessage(errorObject.error.message);
      setErrorObj(errorObject);

      queryClient.setQueryData(['users', context.deletedObj._id], context.previousObj);
    },
    onSettled: (deletedObj) => {
      queryClient.invalidateQueries({ queryKey: ['users', deletedObj?._id] });
    },
    onSuccess: (data, variables) => {
      setOpenSuccess(true);
      setSuccessMessage(data);
    }
  });
};
