import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { Box } from '@mui/material';

import { Header, SideArticles } from 'components/Layout';

import './Main.css';

const Layout = ({ children, path, invalidPath }) => {
	const showHeader = () => {
		if (invalidPath == true || path === '/secret-login' || path === '/account-validation' || path.includes('backoffice')) {
			return null;
		} else return <Header path={path} />;
	};

	// TODO: créer un contexte resultQuery. 
	// Si path includes "/news/" && path.length > 6 ('/news/ ça fait 6 caractères) && result query === 404 // Ce qui voudrait dire que l'article est inconnu
	const showLastArticles = () => { // unknown route 
		if (invalidPath == true || path === '/secret-login' || path === '/account-validation' || path.includes('backoffice') || path === '/news') {
			return null;
		} else return <SideArticles />;
		
	};

	const ContentWrapper = ({ children }) => {
		return path.includes('news') ? <Box>{children}</Box> : <Row style={{
			display: 'flex',
			justifyContent: 'center', 
		}}>{children}</Row>;
	};

	return (
		<>
			{showHeader()}
			<Container
				fluid
				className={`layout ${ path.startsWith('/backoffice') && 'backoffice-bg' }`}
				style={{ minHeight: '100vh' }}>
				<Container>
					<ContentWrapper>
						{showLastArticles()}
						{children}
					</ContentWrapper>
				</Container>
			</Container>
		</>
	);
};

export default Layout;
