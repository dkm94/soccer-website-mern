import jwt_decode, { InvalidTokenError } from 'jwt-decode';

function decodeToken(token){
	try {
		if(!token){
			throw new Error('Error token');
		}
		const user = jwt_decode(token);
		if(!user){
			localStorage.removeItem('token');
			window.location.href = '/';
			return;
		}
        
		localStorage.setItem('soccer-user', JSON.stringify(user));
		const storedUser = localStorage.getItem('soccer-user');
		if(!storedUser){
			throw new Error('User infos not stored !');
		}

	} catch (error) {
		const invalidTokenError = {
			message: 'Access denied',
			reason: 'Invalid token specified',
		};
		alert(JSON.stringify(invalidTokenError));
		localStorage.removeItem('token');
		window.location.href = '/';
	}
}

export default decodeToken;