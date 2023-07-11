import React from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from './List/List';

import './Sidebar.css';

const Sidebar = ({ container, mobileOpen, handleDrawerToggle, drawerWidth }) => {
	return (
		<Box
			component="nav"
			sx={{
				width: { sm: drawerWidth },
				flexShrink: { sm: 0 }, 
			}}
			aria-label="mailbox folders"
			className="sidebar"
		>
			{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
			<Drawer
				container={container}
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{ keepMounted: true }}
				sx={{
					display: {
						xs: 'block',
						sm: 'none', 
					},
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth, 
					},
				}}>
				<List />
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: {
						xs: 'none',
						sm: 'block', 
					},
					'& .MuiDrawer-paper': {
						boxSizing: 'border-box',
						width: drawerWidth,
						top: 'unset',
					},
				}}
				open>
				<List />
			</Drawer>
		</Box>
	);
};

export default Sidebar;
