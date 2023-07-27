/* eslint-disable no-unused-vars */
import { useMutation } from 'react-query';
import { login } from 'services/queries/auth_queries';
import { decodeToken, setToken } from 'utils';

const useLogin = (setSuccessMessage, setOpenSuccess, setOpenError, setError) => {
	return useMutation({
		mutationFn: login,
		onError: (error, newObject, context) => {
			const errorObject = error.response.data;

			setOpenError(true);
			setError(errorObject);
		},
		onSuccess: (data, variables, context) => {
			const { token, auth, message } = data;

			if(auth && token){
				setToken(token);
				decodeToken(token);
			}

			setOpenSuccess(true);
			setSuccessMessage(message);

			window.location.href = '/backoffice/moderators';
		},
	});
};

export default useLogin;