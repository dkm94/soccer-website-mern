import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const IsAdmin = ({ isAdmin }) => {

	useEffect(() => {
		if(!isAdmin){
			window.location.replace('/backoffice');
		}
	}, []);
	return <Outlet />;
};

export default IsAdmin;
