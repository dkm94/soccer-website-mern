import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import { CreateArticleForm, UpdateArticleForm } from 'pages/Backoffice/Articles/Forms';
import { MainPage, ModeratorsPage, ProfilePage, UserArticlesPage } from 'pages/Backoffice';
import Sidebar from 'pages/Backoffice/Sidebar/Sidebar';
import cards from 'seeds/dashboard_cards';

const drawerWidth = 240;

const BackofficeComponent = ({ path, user }) => {
	const [ profileId, setProfileId ] = useState(null);
	const [ userId, setUserId ] = useState(null);

	useEffect(() => {
		if(user){
			setProfileId(user.profileId);
			setUserId(user.userId);
		}
	}, [ user ]);
	
	switch (path) {
		// case '/backoffice':
		// 	return <MainPage cards={cards} drawerWidth={drawerWidth} />;
		case '/backoffice/articles/create':
			return <CreateArticleForm drawerWidth={drawerWidth} />;
		case `/backoffice/articles/author/${ profileId }`:
			return <UserArticlesPage drawerWidth={drawerWidth} profileId={profileId} path={path} />;
		case `/backoffice/articles/edit/${ profileId }`:
			return <UpdateArticleForm drawerWidth={drawerWidth} />;
		case `/backoffice/profile/${ profileId }`:
			return <ProfilePage drawerWidth={drawerWidth} profileId={profileId} userId={userId} />;
		case '/backoffice/moderators':
			return <ModeratorsPage drawerWidth={drawerWidth} />;
		default:
			break;
	}
};

function ResponsiveDrawer({ path, user }) {
	const [ mobileOpen, setMobileOpen ] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<Sidebar
				drawerWidth={drawerWidth}
				mobileOpen={mobileOpen}
				handleDrawerToggle={handleDrawerToggle}
				path={path} 
				user={user}
			/>
			<BackofficeComponent path={path} user={user} />
		</Box>
	);
}

export default ResponsiveDrawer;
