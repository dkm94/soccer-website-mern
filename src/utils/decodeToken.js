import jwt_decode from 'jwt-decode';

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
		if(error) throw error;
	}
}

export default decodeToken;