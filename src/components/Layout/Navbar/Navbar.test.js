import '../../../../__mocks__/matchMedia';
const { render, screen } = require('@testing-library/react');
const { Navbar } = require('..');
const React = require('react');
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'router/AppRouter';

describe('Navbar component tests', () => {
	// let originalWindowLocation = window.location;

	// beforeEach(() => {
	// 	Object.defineProperty(window, 'location', {
	// 	  configurable: true,
	// 	  enumerable: true,
	// 	  value: new URL(window.location.href),
	// 	});
	//   });

	// afterEach(() => {
	// 	Object.defineProperty(window, 'location', {
	// 		configurable: true,
	// 		enumerable: true,
	// 		value: originalWindowLocation,
	// 	});
	// });

	it('should have 4 links items when if user is not authenticated', () => {
		const { getByRole } = render(<Navbar auth={false} />);
		const navbar = getByRole('menu');
		const navbarItems = navbar.childElementCount;
		expect(navbarItems).toEqual(4);
	});

	it('should have 10 links items when if user is authenticated', () => {
		const { getByRole } = render(<Navbar auth={true} />);
		const navbar = getByRole('menu');
		const navbarItems = navbar.childElementCount;
		expect(navbarItems).toEqual(10);
	});

	// it('should redirect to the right page', async () => {
	// 	const user = userEvent.setup();

	// 	render(<AppRouter />, { wrapper: BrowserRouter });

	// 	expect(screen.getByTestId(/home-component/i)).toBeInTheDocument();

	// 	const menuitem = screen.getByTitle('news');
	// 	expect(menuitem).toBeInTheDocument();

	// 	// expect(window.location.pathname).toBe('/');
		
	// 	// menuitem.addEventListener('click', (event) => event.preventDefault(), false);
	// 	await user.click(menuitem);
	// 	expect(screen.getByTestId(/news-component/i)).toBeInTheDocument();

	// 	// expect(window.location.pathname).toBe('/news');

	// });

	// it('should have the active class when clicked', async () => {
	// 	const user = userEvent.setup();
	// 	render(<Navbar auth={true} />);

	// 	const menuitem = screen.getByText(/^news$/i);
	// 	expect(menuitem).toBeTruthy();

	// 	const idValue1 = menuitem.getAttribute('id');
	// 	expect(idValue1).toBe('');

	// 	await user.click(menuitem);
	// 	window.location.pathname = menuitem.getAttribute('href');
	// 	expect(window.location.pathname).toBe('/news');

	// 	console.log(window.location.pathname === menuitem.getAttribute('href'));
	// 	const menuitem2 = screen.getByText(/^news$/i);
	// 	console.log('🚀 ~ file: Navbar.test.js:55 ~ when ~ it ~ menuitem2:', menuitem2);
		
	// 	// const itemPath = menuitem.getAttribute('href');
	// 	// window.location.pathname = itemPath;
	// 	// const idValue2 = menuitem.getAttribute('id');
	// 	// console.log('🚀 ~ file: Navbar.test.js:55 ~ when ~ it ~ idValue2:', idValue2);
	// 	// const expectedUrl = itemPath;
	// 	// expect(window.location.pathname).toBe(expectedUrl);
	// 	// expect(idValue2).toBe('active');
	// });
});