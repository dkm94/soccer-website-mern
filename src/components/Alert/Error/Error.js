import React from 'react';
import Alert from '@material-ui/core/Alert';
import AlertTitle from '@material-ui/core/AlertTitle';
import './Error.css';

const ErrorAlert = ({ showError, title, description }) => {
  return (
    <div style={{ display: showError ? 'block' : 'none' }} className="show-error fade-in">
      <Alert onClose={() => {}} severity="error">
        <AlertTitle>{title}</AlertTitle>
        {description}
      </Alert>
    </div>
  );
};
export default ErrorAlert;
