function setToken(token) {
	localStorage.setItem('token', token);

	const storedToken = localStorage.getItem('token');
	if (!storedToken) {
		throw new Error('Token not stored');
	}
	return true;
}

export default setToken;