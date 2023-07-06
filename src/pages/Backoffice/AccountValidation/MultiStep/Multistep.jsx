import { useState } from 'react';
import { useQuery } from 'react-query';
import { Container, Grid, Button, Stepper, Step, StepLabel } from '@mui/material';

import { Step1, Step2, Step3, Step4 } from 'pages/Backoffice/AccountValidation/MultiStep/Steps';

import { activateAccount, getUsers } from 'services/queries/public_queries';

import './Multistep.css';

const steps = [ 'Step 1', 'Step 2', 'Step 3', 'Step 4' ];

const passwordRegex =
  /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;

const MultiStepForm = () => {
	const [ activeStep, setActiveStep ] = useState(0);
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ confirmPassword, setConfirmPassword ] = useState('');
	const [ accountValidated, setAccountValidated ] = useState(false);
	const [ errorMessage, setErrorMessage ] = useState('');
	const [ inputError, setInputError ] = useState(false);
	const [ input, setInput ] = useState('');
	const [ user, setUser ] = useState(null);

	const {
		data: users,
		error,
		isError,
		isLoading,
	} = useQuery({
		staleTime: Infinity,
		queryKey: [ 'users' ],
		queryFn: () => getUsers(),
	});

	const isEmpty = (email) => {
		if(email === ''){
			setInputError(true);
			setErrorMessage('Please enter a valid email');
			return;
		}
		return false;
	};

	const isRegistered = (email) => {
		const registeredUser = users?.find((user) => user?.email === email);
		if(!registeredUser){
			setInputError(true);
			setErrorMessage('User not found');
			return;
		}
		setUser({ ...registeredUser });
		return true;
	};

	const isNotValidated = () => {
		const registeredUser = users?.find((user) => user?.email === email);
		if(registeredUser.accountValidated === true){
			setInputError(true);
			setErrorMessage('This account has already been activated');
			return;
		}
		return true;
	};

	const firstStepValidation = (email) => {
		if(isEmpty(email)) return;
		if(!isRegistered(email)) return;
		if(!isNotValidated()) return;
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		return;
	};

	const isInvalidPassword = (password) => {
		if(password){
			return password.match(passwordRegex) == null;
		}
	};

	const passwordsMatch = password?.trim() == confirmPassword?.trim();

	const secondStepValidation = (password) => {
		if(isInvalidPassword(password)){
			setInputError(true);
			setErrorMessage('Incorrect password');
			setInput('password');
			return;
		}
		if(!passwordsMatch){
			setInputError(true);
			setErrorMessage('Passwords should match');
			setInput('confirmPwd');
			return;
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		return;
	};

	// eslint-disable-next-line require-await
	const thirdStepValidation = async (accountValidated) => {
		if(accountValidated){
			const form = {
				password,
				confirmPwd: confirmPassword,
				accountValidated,
				_id: user?._id,
			};
			await activateAccount(form).then(() => setActiveStep((prevActiveStep) => prevActiveStep + 1));
		}
		return;
	};

	const handleNext = () => {
		if(activeStep === 0){
			firstStepValidation(email);
		}
		if(activeStep === 1){
			secondStepValidation(password);
		}
		if(activeStep === 2){
			thirdStepValidation(accountValidated);
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const disableNextButton = () => {
		if (activeStep === steps.length - 1) return true;
		if (activeStep == 0 && email === '') return true;
		if (activeStep == 1 && password === '') return true;
		if (activeStep == 1 && confirmPassword === '') return true;
		if (activeStep == 2 && !accountValidated) return true;
		return false;
	};

	return (
		<Container maxWidth="sm" sx={{ mt: 8 }}>
			<Stepper activeStep={activeStep}>
				{steps.map((label) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
					</Step>
				))}
			</Stepper>
			<Grid
				container
				direction="column"
				alignItems="center"
				spacing={2}
				mt={12}
				className="step-wrapper">
				<Grid item xs={12}>
					{activeStep === 0 && <Step1 setEmail={setEmail} email={email} error={errorMessage} isError={inputError} />}
					{activeStep === 1 && (
						<Step2
							setPassword={setPassword}
							password={password}
							setConfirmPassword={setConfirmPassword}
							confirmPassword={confirmPassword}
							error={errorMessage} 
							isError={inputError}
							input={input}
						/>
					)}
					{activeStep === 2 && (
						<Step3
							setAccountValidated={setAccountValidated}
							accountValidated={accountValidated}
						/>
					)}
					{activeStep === 3 && <Step4 />}
				</Grid>
				<Grid item xs={12}>
					{activeStep > 0 && activeStep !== 3 && (
						<Button variant="contained" color="secondary" onClick={handleBack}>
              Back
						</Button>
					)}
					{activeStep !== 3 && (
						<Button
							variant="contained"
							color="primary"
							onClick={handleNext}
							sx={{ marginLeft: activeStep !== 0 && 8 }}
							disabled={disableNextButton()}>
							{activeStep === steps.length - 1 ? 'Submit' : 'Next'}
						</Button>
					)}
					{activeStep === 3 && (
						<Button
							href="/secret-login"
							className="stepper-redirection"
							variant="contained"
							color="primary"
							style={{ marginTop: '2rem' }}>
              Go to login
						</Button>
					)}
				</Grid>
			</Grid>
		</Container>
	);
};

export default MultiStepForm;
