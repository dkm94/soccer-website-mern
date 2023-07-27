import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { decodeToken } from 'utils';

const IsLogged = ({ token }) => {

	useEffect(() => {
		if(token){
			decodeToken(token);
		}
	}, []);

	return (<Outlet />);
};

export default IsLogged;
