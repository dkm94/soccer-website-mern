import { useState } from 'react';
import { Container, Grid, Button, Stepper, Step, StepLabel } from '@mui/material';
import ConfirmEmail from './Steps/Step1/ConfirmEmail';
import CreatePassword from './Steps/Step2/CreatePassword';
import ActivateAccount from './Steps/Step3/ActivateAccount';
import { Confirmation } from './Steps/Step4/Confirmation';
import './Multistep.css';

// Todo: check mail
// Todo: redirection if logged in => redirect from /account-validation to /backoffice

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accountValidated, setAccountValidated] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
          {activeStep === 0 && <ConfirmEmail setEmail={setEmail} email={email} />}
          {activeStep === 1 && (
            <CreatePassword
              setPassword={setPassword}
              password={password}
              setConfirmPassword={setConfirmPassword}
              confirmPassword={confirmPassword}
            />
          )}
          {activeStep === 2 && (
            <ActivateAccount
              setAccountValidated={setAccountValidated}
              accountValidated={accountValidated}
            />
          )}
          {activeStep === 3 && <Confirmation />}
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
