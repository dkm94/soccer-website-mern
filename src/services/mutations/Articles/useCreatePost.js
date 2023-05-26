/* eslint-disable no-unused-vars */
import { useMutation } from 'react-query';
import { createPost } from '../../queries/mods_queries';

export const useCreatePost = (setSuccessMessage, setOpenSuccess, setOpenError, setError) => {
  const profileId = JSON.parse(localStorage.getItem('profileId'));

  return useMutation({
    mutationFn: createPost,
    onError: (error, newObject, context) => {
      const errorObject = error.response.data;
      setOpenError(true);
      setError(errorObject);
    },
    onSuccess: (data, variables, context) => {
      const { message } = data;
      setOpenSuccess(true);
      setSuccessMessage(message);
      setTimeout(() => {
        window.location.href = `/backoffice/articles/author/${profileId}`;
      }, 3000);
    }
  });
};
