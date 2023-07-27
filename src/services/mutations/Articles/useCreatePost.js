/* eslint-disable no-unused-vars */
import { useMutation } from 'react-query';
import { createPost } from 'services/queries/mods_queries';

const useCreatePost = (setSuccessMessage, setOpenSuccess, setOpenError, setError, profileId) => {

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
				window.location.href = `/backoffice/articles/author/${ profileId }`;
			}, 3000);
		},
	});
};

export default useCreatePost;