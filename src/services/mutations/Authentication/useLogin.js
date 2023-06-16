/* eslint-disable no-unused-vars */
import { useMutation } from 'react-query';
import { login } from '../../queries/auth_queries';

export const useLogin = (setSuccessMessage, setOpenSuccess, setOpenError, setError) => {
  function setToken(token) {
    localStorage.setItem('token', token);

    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      throw new Error('Token not stored');
    }
  }

  return useMutation({
    mutationFn: login,
    onError: (error, newObject, context) => {
      const errorObject = error.response.data;

      setOpenError(true);
      setError(errorObject);
    },
    onSuccess: (data, variables, context) => {
      const { token, auth, profileId, isAdmin, isMod, userId, message } = data;

      setToken(token);

      localStorage.setItem('logged_in_status', JSON.stringify(auth));
      localStorage.setItem('profileId', JSON.stringify(profileId));
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
      localStorage.setItem('isMod', JSON.stringify(isMod));
      localStorage.setItem('userId', JSON.stringify(userId));

      setOpenSuccess(true);
      setSuccessMessage(message);

      if (auth) {
        window.location.href = '/backoffice';
      }
    }
  });
};
