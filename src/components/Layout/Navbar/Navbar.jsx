import React, { useEffect, useState } from 'react';
import { Typography , Button } from '@mui/material';
import { Navbar, Nav, Container } from 'react-bootstrap';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

import './Navbar.css';
import { Link } from 'react-router-dom';

const navItems = [
	{
		id: 1,
		title: 'home',
		path: '/',
	},
	{
		id: 2,
		title: 'competitions',
		path: '/competitions',
	},
	{
		id: 3,
		title: 'match history',
		path: '/matchhistory',
	},
	{
		id: 4,
		title: 'news',
		path: '/news',
	},
	{
		id: 5,
		title: 'backoffice',
		path: '/backoffice/moderators',
	},
];

const Navigation = ({ auth }) => {
	const profileId = JSON.parse(localStorage.getItem('profileId'));
	
	const [ logoutText, setLogoutText ] = useState('');
	const [ toggle, setToggle ] = useState(false);

	const logOut = () => {
		console.log('déconnexion...');
		localStorage.removeItem('logged_in_status');
		localStorage.removeItem('profileId');
		localStorage.removeItem('isAdmin');
		localStorage.removeItem('isMod');
		localStorage.removeItem('userId');
		localStorage.removeItem('accountValidated');
		localStorage.removeItem('token');
		console.log('Vous avez été déconnecté.');
		window.location.href = '/';
	};

	useEffect(() => {
		if(toggle){
			setLogoutText('Log out');
		} else {
			setLogoutText('');
		}
	}, [ toggle ]);

	const toggleNav = () => {
		setToggle(!toggle);
	};

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				className="nav-style"
				style={{
					position: 'fixed',
					zIndex: 1000, 
				}}>
				<Container>
					<Navbar.Toggle className="nav-toggle" aria-controls="responsive-navbar-nav" onClick={toggleNav}/>
					<Navbar.Brand href="/">
						<div className="logo-style">2LEFOOT</div>
					</Navbar.Brand>
					<Navbar.Collapse className="justify-content-center" id="responsive-navbar-nav">
						<Nav className="nav-items">
							{navItems?.map((item) => (
								<Nav.Link
									key={item.id}
									href={item?.path}
									style={{ display: !auth && item?.id == 5 && 'none' }}
									id={window.location.pathname === item.path ? 'active' : ''}>
									{item?.title}
								</Nav.Link>
							))}
							{auth && (
								<>
									<Nav.Link
										key={6}
										href={'/backoffice/moderators'}
										id={window.location.pathname === '/backoffice/moderators' ? 'active' : ''}
										className="additional-links"
										onClick={() => localStorage.setItem('list-item-idx', 0)}
									>
										Moderators
									</Nav.Link>
									<Nav.Link
										key={7}
										className="additional-links"
										href={`/backoffice/profile/${ profileId }`}
										id={window.location.pathname === `/backoffice/profile/${ profileId }` ? 'active' : ''}
										onClick={() => localStorage.setItem('list-item-idx', 1)}
									>
										My profile
									</Nav.Link>
									<Nav.Link
										key={8}
										className="additional-links"
										href={'/backoffice/articles/create'}
										id={window.location.pathname === '/backoffice/articles/create' ? 'active' : ''}
										onClick={() => localStorage.setItem('list-item-idx', 2)}
									>
										Create article
									</Nav.Link>
									<Nav.Link
										key={9}
										className="additional-links"
										href={`/backoffice/articles/author/${ profileId }`}
										id={window.location.pathname === `/backoffice/articles/author/${ profileId }` ? 'active' : ''}
										onClick={() => localStorage.setItem('list-item-idx', 3)}
									>
										My articles
									</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
					{!auth ? <Link to="/secret-login" reloadDocument>
						<PersonIcon />
					</Link> : <Button size="small" onClick={logOut} id="logout-btn" variant="text">
                    					<ExitToAppIcon /> <Typography>{logoutText}</Typography>
					</Button>}
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
