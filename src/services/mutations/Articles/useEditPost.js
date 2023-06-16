/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { editPost } from '../../queries/mods_queries';

export const useEditPost = (
  setSuccessMessage,
  setOpenSuccess,
  setOpenError,
  setErrorMessage,
  setTempForm,
  setErrorObj
) => {
  const queryClient = useQueryClient();

  const profileId = JSON.parse(localStorage.getItem('profileId'));

  return useMutation({
    mutationFn: editPost,
    onMutate: async (updatedObj) => {
      await queryClient.cancelQueries({ queryKey: ['articles', updatedObj._id] });
      const previousObj = queryClient.getQueryData(['articles', updatedObj._id]);
      queryClient.setQueryData(['articles', updatedObj._id], updatedObj._id);

      return { previousObj, updatedObj };
    },
    onError: (error, updatedObj, context) => {
      const errorObject = error.response.data;

      setOpenError(true);
      setTempForm(updatedObj);
      setErrorMessage(errorObject.error.message);
      setErrorObj(errorObject);

      queryClient.setQueryData(['articles', context.updatedObj._id], context.previousObj);
    },
    onSettled: (updatedObj) => {
      queryClient.invalidateQueries({ queryKey: ['articles', updatedObj?._id] });
    },
    // Notice the second argument is the variables object that the `mutate` function receives
    onSuccess: (data, variables) => {
      setOpenSuccess(true);
      setSuccessMessage(data);

      setTimeout(() => {
        window.location.href = `/backoffice/articles/author/${profileId}`;
      }, 3000);
    }
  });
};
