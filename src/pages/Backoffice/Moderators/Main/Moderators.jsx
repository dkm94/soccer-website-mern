/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, Snackbar , useTheme } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import ModsTable from '../Table/ModsTable';

import './Moderators.css';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Moderators = ({ drawerWidth }) => {
	const { palette } = useTheme();

	const [ error, setError ] = useState(null);
	const [ openSuccess, setOpenSuccess ] = useState(false);
	const [ openError, setOpenError ] = useState(false);
	const [ successMessage, setSuccessMessage ] = useState(null);

	const handleClose = (event) => {
		setOpenSuccess(false);
		setOpenError(false);
	};

	return (
		<div
			className="moderators-wrapper"
		>
			<ModsTable />

			<Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
				<Alert severity="success" sx={{
					width: '100%',
					color: '#FFF', 
				}}>
					{successMessage}
				</Alert>
			</Snackbar>
			<Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
				<Alert severity="error" sx={{
					width: '100%',
					color: '#FFF', 
				}}>
					{error?.error.message}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Moderators;
