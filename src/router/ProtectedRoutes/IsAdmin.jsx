import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const IsAdmin = ({ isAdmin, profileId }) => {

	useEffect(() => {
		if(!isAdmin){
			window.location.replace(`/backoffice/articles/author/${ profileId }`);
		}
	}, []);
	return <Outlet />;
};

export default IsAdmin;
