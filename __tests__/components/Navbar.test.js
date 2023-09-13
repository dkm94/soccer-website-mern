// import '../../__mocks__/matchMedia';
// const { render, screen } = require('@testing-library/react');
// import Navbar from '../../src/components/Layout/Navbar/Navbar.jsx';
// const React = require('react');
// import userEvent from '@testing-library/user-event';
// import { QueryClient, QueryClientProvider } from 'react-query';
// import { MemoryRouter } from 'react-router-dom';

// describe('Navbar component tests', () => {
// 	let originalWindowLocation = window.location;

// 	beforeEach(() => {
// 		Object.defineProperty(window, 'location', {
// 		  configurable: true,
// 		  enumerable: true,
// 		  value: new URL(window.location.href),
// 		});
// 	  });

// 	afterEach(() => {
// 		Object.defineProperty(window, 'location', {
// 			configurable: true,
// 			enumerable: true,
// 			value: originalWindowLocation,
// 		});
// 	});

// 	function wrapper({ children }){
// 		const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
// 		return <MemoryRouter initialEntries={[ '/' ]}>
// 			<QueryClientProvider client={queryClient}>
// 				{children}
// 			</QueryClientProvider>
// 		</MemoryRouter>;
// 	}

// 	it('should have 4 links items when if user is not authenticated', () => {
// 		const { getByRole } = render(<Navbar token={token} user={user} />, { wrapper });
// 		const navbar = getByRole('menu');
// 		const navbarItems = navbar.childElementCount;
// 		expect(navbarItems).toEqual(4);
// 	});

// 	it('should have 10 links items when if user is authenticated', () => {
// 		const { getByRole } = render(<Navbar auth={true} />, { wrapper });
// 		const navbar = getByRole('menu');
// 		const navbarItems = navbar.childElementCount;
// 		expect(navbarItems).toEqual(10);
// 	});

// 	// it('should redirect to the right page', () => {
// 	// 	const user = userEvent.setup();

// 	// 	render(<><Navbar auth={true} /><Routes>
// 	// 		<Route path='/' element={<Home />} />
// 	// 		<Route path='/news' element={<News />} />
// 	// 	</Routes></>, { wrapper });

// 	// 	const homeUrl = 'http://localhost:3000/';
// 	// 	window.location.href = homeUrl;
// 	// 	console.log(window.location.href);
// 	// 	expect(screen.getByTestId(/home-component/i)).toBeInTheDocument();
// 	// 	expect(window.location.pathname).toBe('/');

// 	// 	const navItem = screen.getByRole('link', { name: /news/i });
// 	// 	expect(navItem).toBeInTheDocument();
// 	// 	expect(navItem).toHaveAttribute('href', '/news');
// 	// 	const itemPath = navItem.getAttribute('href');

// 	// 	user.click(navItem);
// 	// 	window.location.pathname = itemPath;

// 	// 	expect(window.location.pathname).toBe('/news');
// 	// 	console.log(window.location.pathname);
// 	// 	console.log(window.location.href);
// 	// 	expect(screen.getByTestId(/news-component/i)).toBeInTheDocument();
// 	// });
// });