/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { editPost } from '../queries/mods_queries';

export const useEditPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // mutationFn: () => editPost(id),
    mutationFn: editPost,
    onMutate: async (updatedObj) => {
      await queryClient.cancelQueries({ queryKey: ['articles', updatedObj._id] });
      const previousObj = queryClient.getQueryData(['articles', updatedObj._id]);
      queryClient.setQueryData(['articles', updatedObj._id], updatedObj._id);

      return { previousObj, updatedObj };
    },
    onError: (err, updatedObj, context) => {
      // handle error, display "err"
      queryClient.setQueryData(['articles', context.updatedObj._id], context.previousObj);
    },
    onSettled: (updatedObj) => {
      queryClient.invalidateQueries({ queryKey: ['articles', updatedObj?._id] });
    },
    // Notice the second argument is the variables object that the `mutate` function receives
    onSuccess: (data, variables) => {
      //handle success with toast
      alert('Post ok!');
    }
  });
};
