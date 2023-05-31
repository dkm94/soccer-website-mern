/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query';
import { deleteMods } from '../../queries/admin_queries';

export const useDeleteMods = (setResultMessage, setSelectedIds, onClose) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMods,
    onMutate: async (userIds) => {
      await queryClient.cancelQueries({ queryKey: ['users', 'profiles'] });
      queryClient.setQueryData(['users', 'profiles']);

      return userIds;
    },
    onError: (error, updatedObj, context) => {
      const errorObject = error.response.data;
      setResultMessage(errorObject.message);

      queryClient.setQueryData(['users', 'profiles']);
    },
    onSettled: (updatedObj) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'profiles'] });
    },
    onSuccess: (data, variables) => {
      const { success, message } = data;
      if (success) {
        queryClient.invalidateQueries('users', 'profiles');
        setSelectedIds([]);
        setTimeout(() => {
          onClose();
        }, [2000]);
      }
    }
  });
};
