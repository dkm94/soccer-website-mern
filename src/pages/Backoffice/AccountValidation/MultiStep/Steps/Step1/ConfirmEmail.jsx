import React from 'react';
import { Box, Container, TextField, Typography } from '@mui/material';

import './ConfirmEmail.css';

const ConfirmEmail = ({ setEmail, email, error, isError }) => {
	return (
		<Box>
			<Typography className="step-title" variant="h5" component={'h1'}>
        Confirm your email address
			</Typography>
			<Container className="step-content">
				<Typography variant="body1">Please enter the email address of your account</Typography>
				<TextField
					type="text"
					label="Email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					error={isError}
					helperText={error}
				/>
			</Container>
		</Box>
	);
};

export default ConfirmEmail;
