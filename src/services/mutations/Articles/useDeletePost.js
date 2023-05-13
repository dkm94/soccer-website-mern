/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { deletePost } from '../../queries/mods_queries';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const profileId = JSON.parse(localStorage.getItem('profileId'));

  return useMutation({
    mutationFn: deletePost,
    onMutate: async (deletedObj) => {
      await queryClient.cancelQueries({ queryKey: ['articles', deletedObj._id] });
      const previousObj = queryClient.getQueryData(['articles', deletedObj._id]);
      queryClient.setQueryData(['articles', deletedObj._id], deletedObj._id);

      return { previousObj, deletedObj };
    },
    onError: (err, deletedObj, context) => {
      // handle error, display "err"
      queryClient.setQueryData(['articles', context.deletedObj._id], context.previousObj);
    },
    onSettled: (deletedObj) => {
      queryClient.invalidateQueries({ queryKey: ['articles', deletedObj?._id] });
    },
    // Notice the second argument is the variables object that the `mutate` function receives
    onSuccess: (data, variables) => {
      //handle success with toast
      alert('Post deleted!');
      console.log('🚀 ~ file: useDeletePost.js:32 ~ useDeletePost ~ variables:', variables);
      window.location.href = `/backoffice/articles/author/${profileId}`;
    }
  });
};
