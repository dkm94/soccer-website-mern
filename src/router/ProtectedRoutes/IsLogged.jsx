import React from 'react';
import { Outlet } from 'react-router-dom';

const IsLogged = ({ auth }) => {

	if(!auth){
		window.location.href='/';
	}
	return (<Outlet />);
};

export default IsLogged;
