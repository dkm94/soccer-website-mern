import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { Box } from '@mui/material';

import { Header, SideArticles } from 'components/Layout';

import './Main.css';

const Layout = ({ children, path }) => {
	const showHeader = () => {
		if (path === '/secret-login' || path === '/account-validation' || path.includes('backoffice')) {
			return null;
		}
		return <Header path={path} />;
	};

	const showLastArticles = () => {
		if (
			path === '/secret-login' ||
      path.includes('news') ||
      path.includes('backoffice') ||
      path === '/account-validation'
		) {
			return null;
		}
		return <SideArticles />;
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
				// className={`layout ${path === '/backoffice' && 'backoffice-bg'}`}
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
