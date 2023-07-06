import React from 'react';
import { Container } from 'react-bootstrap';

import MultiStepForm from 'pages/Backoffice/AccountValidation/MultiStep/Multistep';

const AccountValidation = ({ auth }) => {
	
	if(auth) return window.location.href = '/';

	return (
		<div>
			<Container>
				<MultiStepForm />
			</Container>
		</div>
	);
};

export default AccountValidation;
