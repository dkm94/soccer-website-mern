import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Button } from '@mui/material';

import logo from '../../../images/toutlefoot-logo.png';

import './Navbar.css';

export const navItems = [
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
];

const Navigation = ({ auth }) => {
	const profileId = JSON.parse(localStorage.getItem('profileId'));
	// const navigate = useNavigate();

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

	return (
		<>
			<nav className="desktop-nav nav-style nav-items" role="menu" >
				<div>
					<img src={logo} height={48} alt="2lefoot-logo" />
				</div>
				{navItems?.map((item) => (
					<Link
						title={item?.title}
						role="link"
						key={item.id}
						to={item?.path}
						id={window.location.pathname === item.path ? 'active' : ''}
						
					>
						{item?.title}
					</Link>
				))}
				{auth && (
					<>
						<Link
							key={5}
							to={'/backoffice'}
							id={window.location.pathname === '/backoffice' ? 'active' : ''}
							onClick={() => localStorage.setItem('list-item-idx', 0)}
							
						>
                    					Backoffice
						</Link>
						<Link
							key={6}
							to={'/backoffice/moderators'}
							id={window.location.pathname === '/backoffice/moderators' ? 'active' : ''}
							className="additional-links"
							onClick={() => localStorage.setItem('list-item-idx', 1)}
							
						>
										Moderators
						</Link>
						<Link
							key={7}
							className="additional-links"
							to={`/backoffice/profile/${ profileId }`}
							id={window.location.pathname === `/backoffice/profile/${ profileId }` ? 'active' : ''}
							onClick={() => localStorage.setItem('list-item-idx', 2)}
							
						>
										My profile
						</Link>
						<Link
							key={8}
							className="additional-links"
							to={'/backoffice/articles/create'}
							id={window.location.pathname === '/backoffice/articles/create' ? 'active' : ''}
							onClick={() => localStorage.setItem('list-item-idx', 3)}
							
						>
										Create article
						</Link>
						<Link
							key={9}
							className="additional-links"
							to={`/backoffice/articles/author/${ profileId }`}
							id={window.location.pathname === `/backoffice/articles/author/${ profileId }` ? 'active' : ''}
							onClick={() => localStorage.setItem('list-item-idx', 4)}
							
						>
										My articles
						</Link>
						<Button size="small" onClick={logOut} id="logout-btn" key={10} variant="text">
                    					Log out
						</Button>
					</>
				)}
			</nav>
			<nav className="responsive-nav">

			</nav>
		</>
	);
};

export default Navigation;
