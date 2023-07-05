import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Container, TextField, Typography, InputAdornment, IconButton } from '@mui/material';

const CreatePassword = ({ setPassword, password, setConfirmPassword, confirmPassword, error, isError, input }) => {
	console.log('🚀 ~ file: CreatePassword.jsx:7 ~ CreatePassword ~ input:', input);
	const [ showPassword, setShowPassword ] = useState(false);
	const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	console.log(input === 'password');
	console.log(input === 'confirmPwd');

	return (
		<Box>
			<Typography className="step-title" variant="h5" component={'h1'}>
        Set a secure password
			</Typography>
			<Container className="step-content">
				<Typography variant="body1">
          Your password must be a minimum of six characters and must include at least one uppercase
          letter, one lowercase letter, one special character and cannot exceed 60 characters.
				</Typography>
				<TextField
					label="Password"
					value={password}
					type={showPassword ? 'text' : 'password'}
					name="password"
					onChange={(e) => setPassword(e.target.value)}
					fullWidth
					error={input === 'password'}
					helperText={input === 'password' && error}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end">
									{showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					label="Confirm password"
					type={showConfirmPassword ? 'text' : 'password'}
					name="confirmPwd"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					fullWidth
					error={input === 'confirmPwd'}
					helperText={input === 'confirmPwd' && error}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowConfirmPassword}
									onMouseDown={handleMouseDownPassword}
									edge="end">
									{showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
			</Container>
		</Box>
	);
};

export default CreatePassword;
