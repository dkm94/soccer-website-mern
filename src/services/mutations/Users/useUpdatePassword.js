/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { updatePassword } from '../../queries/common_queries';

export const useUpdatePassword = (setResultMessage, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePassword,
    onMutate: async (updatedUser) => {
      await queryClient.cancelQueries({ queryKey: ['users', updatedUser._id] });
      const previousUser = queryClient.getQueryData(['users', updatedUser._id]);
      queryClient.setQueryData(['users', updatedUser._id], updatedUser._id);

      return { previousUser, updatedUser };
    },
    onError: (error, updatedUser, context) => {
      const errorObject = error.response.data;
      setResultMessage(errorObject.message);

      queryClient.setQueryData(['users', context.updatedUser._id], context.previousUser);
    },
    onSettled: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['users', updatedUser?._id] });
    },
    onSuccess: (data, variables) => {
      const { success, message } = data;
      if (success) {
        queryClient.invalidateQueries('users');
        setTimeout(() => {
          onClose();
        }, [2000]);
      }
    }
  });
};
