import axios from 'axios';
const BASE_URL = 'https://soccer-api-2zzl.onrender.com';
const token = localStorage.getItem('token');

const createPost = async (form) => {
	try {
		const url = `${ BASE_URL }/mod/articles/create`;
		const customHeaders = { Authorization: `Bearer ${ token }` };
		const { data } = await axios.post(url, form, {
			headers: customHeaders,
			signal: new AbortController().signal,
		});
		return data;
	} catch (err) {
		if (err) throw err;
	}
};

const editPost = async (form) => {
	try {
		const { _id } = form;
		const url = `${ BASE_URL }/mod/articles/edit/${ _id }`;
		const customHeaders = { Authorization: `Bearer ${ token }` };

		const { data } = await axios.put(url, form, {
			headers: customHeaders,
			signal: new AbortController().signal,
		});
		return data;
	} catch (err) {
		if (err) throw err;
	}
};

const deletePost = async (_id) => {
	const url = `${ BASE_URL }/mod/articles/delete/${ _id }`;
	const customHeaders = {
		Authorization: `Bearer ${ token }`,
		'Content-Type': 'multipart/form-data',
	};
	try {
		const { data } = await axios.delete(url, { headers: customHeaders });
		return data;
	} catch (err) {
		if (err) throw err;
	}
};

export {
	createPost, editPost, deletePost, 
};
