import * as React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { CreateArticleForm, UpdateArticleForm } from 'pages/Backoffice/Articles/Forms';
import { MainPage, ModeratorsPage, ProfilePage, UserArticlesPage } from 'pages/Backoffice';
import Sidebar from 'pages/Backoffice/Sidebar/Sidebar';
import cards from 'seeds/dashboard_cards';

const drawerWidth = 240;

const profileId = JSON.parse(localStorage.getItem('profileId'));
const path = window.location.pathname;

const backofficeComponent = () => {
	let { id } = useParams();
	switch (path) {
		case '/backoffice':
			return <MainPage cards={cards} drawerWidth={drawerWidth} />;
		case '/backoffice/articles/create':
			return <CreateArticleForm drawerWidth={drawerWidth} />;
		case `/backoffice/articles/author/${ profileId }`:
			return <UserArticlesPage drawerWidth={drawerWidth} profileId={profileId} path={path} />;
		case `/backoffice/articles/edit/${ id }`:
			return <UpdateArticleForm drawerWidth={drawerWidth} />;
		case `/backoffice/profile/${ id }`:
			return <ProfilePage drawerWidth={drawerWidth} profileId={profileId} />;
		case '/backoffice/moderators':
			return <ModeratorsPage drawerWidth={drawerWidth} />;
		default:
			break;
	}
};

function ResponsiveDrawer() {
	const [ mobileOpen, setMobileOpen ] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	// const container = window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar
				// container={container}
				drawerWidth={drawerWidth}
				mobileOpen={mobileOpen}
				handleDrawerToggle={handleDrawerToggle}
			/>
			{/* {backofficeComponent[window.location.pathname]} */}
			{backofficeComponent()}
		</Box>
	);
}

export default ResponsiveDrawer;
