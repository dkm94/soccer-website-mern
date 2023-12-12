import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { Navbar, Nav, Container } from 'react-bootstrap';
import { Typography , Button, styled } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import logo from '../../../images/Logo-PZ.png';
import logoMD from '../../../images/Logo-PZ-md.png';
import logoSM from '../../../images/Logo-PZ-sm.png';

import './Navbar.css';
import { decodeToken } from 'utils';
import useSticky from 'utils/hooks/useSticky';

const ButtonWrapper = styled(Link)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row', 
	textDecoration: 'none',
	color: theme.palette.white.main,
	textTransform: 'uppercase',
	gap: '5px',
}));
const LoginText = styled(Typography)(() => ({
	textDecoration: 'none',
	placeSelf: 'center', 
	fontSize: 'unset',
}));

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
];

const Navigation = ({ token, user }) => {
	const { sticky, stickyRef } = useSticky();

	const [ logoutText, setLogoutText ] = useState('');
	const [ loginText, setLoginText ] = useState('');
	const [ toggle, setToggle ] = useState(false);
	const [ profileId, setProfileId ] = useState(null);

	const backofficeLinks = [
		{
			id: 5,
			title: 'moderators',
			path: '/backoffice/moderators',
		},
		{
			id: 6,
			title: 'my profile',
			path: `/backoffice/profile/${ profileId }`,
		},
		{
			id: 7,
			title: 'create article',
			path: '/backoffice/articles/create',
		},
		{
			id: 8,
			title: 'my articles',
			path: `/backoffice/articles/author/${ profileId }`,
		},
	];

	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);
	
	useEffect(() => {
		if(token){
			decodeToken(token);
		}

	}, []);

	useEffect(() => {
		if(user){
			setProfileId(user.profileId);
		}
	}, []);

	const handleClose = () => {
		setAnchorEl(null);
	  };

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const logOut = () => {
		console.log('déconnexion...');
		localStorage.removeItem('soccer-user');
		localStorage.removeItem('token');
		localStorage.removeItem('list-item-idx');
		console.log('Vous avez été déconnecté.');
		window.location.href = '/';
	};

	useEffect(() => {
		if(toggle && user){
			setLogoutText('Log out');
		} else if(toggle && !user){
			setLoginText('Log in');
		} else {
			// setLogoutText('');
			// setLoginText('');
		}
	}, [ toggle ]);

	const toggleNav = () => {
		setToggle(!toggle);
	};

	const isBackoffice = window.location.pathname.includes('backoffice');

	return (
		<>
			<Navbar
				collapseOnSelect
				expand="lg"
				className="nav-style"
			>
				<Container className="nav-container">
					<div className="header flex">
						<Navbar.Toggle className="nav-toggle" aria-controls="responsive-navbar-nav" onClick={toggleNav}/>
						<Navbar.Brand href="/">
							<img src={logo} alt="logo" className="logo" />
							<img src={logoMD} alt="logo" className="logo-md" />
							<img src={logoSM} alt="logo" className="logo-sm" />
						</Navbar.Brand>
					</div>
					<Navbar.Collapse ref={stickyRef} className={classNames('nav flex justify-content-center', { sticky })} id="responsive-navbar-nav">
						<Nav className="nav-items" role="menu" >
							{navItems?.map((item) => (
								<Nav.Link
									title={item?.title}
									role="link"
									key={item.id}
									href={item?.path}
									// id={window.location.pathname === item.path ? 'active' : ''}
								>
									{item?.title}
								</Nav.Link>
							))}
							{profileId && (
								<>
									<Nav.Link
										key={6}
										href={'/backoffice/moderators'}
										// id={window.location.pathname === '/backoffice/moderators' ? 'active' : ''}
										className="additional-links"
										onClick={() => localStorage.setItem('list-item-idx', 0)}
									>
										Moderators
									</Nav.Link>
									<Nav.Link
										key={7}
										className="additional-links"
										href={`/backoffice/profile/${ profileId }`}
										// id={window.location.pathname === `/backoffice/profile/${ profileId }` ? 'active' : ''}
										onClick={() => localStorage.setItem('list-item-idx', 1)}
									>
										My profile
									</Nav.Link>
									<Nav.Link
										key={8}
										className="additional-links"
										href={'/backoffice/articles/create'}
										// id={window.location.pathname === '/backoffice/articles/create' ? 'active' : ''}
										onClick={() => localStorage.setItem('list-item-idx', 2)}
									>
										Create article
									</Nav.Link>
									<Nav.Link
										key={9}
										className="additional-links"
										href={`/backoffice/articles/author/${ profileId }`}
										// id={window.location.pathname === `/backoffice/articles/author/${ profileId }` ? 'active' : ''}
										onClick={() => localStorage.setItem('list-item-idx', 3)}
									>
										My articles
									</Nav.Link>
								</>
							)}
							{token && <Button 
								className="nav-link bo-btn"
								sx={{
									'&.MuiButton-root:hover': {
										backgroundColor: 'transparent',
										color: '#ad0606', 
									}, 
								}}
								style={{
									fontSize: '1rem',
									cursor: 'pointer',
									fontWeight: isBackoffice && 'bold ',
								}}
								// id={`basic-button ${ isBackoffice ? 'active' : '' }`}
								id={'basic-button'}
								aria-controls={open ? 'basic-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleClick}
							>BACKOFFICE</Button>}
							<Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								MenuListProps={{ 'aria-labelledby': 'basic-button' }}
							>
								{backofficeLinks?.map((item) => (
									<MenuItem 
										key={item.id} 
										onClick={handleClose} 
										style={{ textTransform: 'capitalize' }}
									>
										<Nav.Link
											title={item?.title}
											role="link"
											key={item.id}
											href={item?.path}
										>{item?.title}</Nav.Link>
									</MenuItem>
								))}
							</Menu>
							{!user ? 
								<ButtonWrapper to="/secret-login" reloadDocument>
									<PersonIcon style={{
										color: '#eae8e8',
										alignSelf: 'center', 
									}} /> <LoginText className="nav-link">{loginText}</LoginText>
								</ButtonWrapper>
					 : <Button size="small" sx={{ '&.MuiButton-root:hover': { backgroundColor: 'transparent' } }} onClick={logOut} id="logout-btn" variant="text">
                    					<ExitToAppIcon /> <Typography marginLeft={2} fontSize="1rem" fontFamily="'Bellota Text', serif" >{logoutText}</Typography>
								</Button>}
						</Nav>
					</Navbar.Collapse>
					{sticky && (
						<div
							style={{ height: `${ stickyRef.current?.clientHeight }px` }}
						/>
					)}
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
