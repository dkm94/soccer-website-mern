import React from 'react';
import { render, screen } from '@testing-library/react';
import IsAdmin from '../../src/router/ProtectedRoutes/IsAdmin';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { setLocalStorage } from '../__utils__/testHelpers';
import fakeUser from '../__utils__/fakeUser';
import userEvent from '@testing-library/user-event';

describe('IsAdmin component tests', () => {
	const { location } = window;
	const getHrefSpy = jest.fn(() => '/backoffice/moderators');
	const setHrefSpy = jest.fn(href => href);

	beforeEach(() => {
		window.localStorage.clear();

		delete window.location;
		window.location = {};
		Object.defineProperty(window.location, 'href', {
			get: getHrefSpy,
			set: setHrefSpy,
		});
	});

	afterEach(() => {
		window.location = location;
	});

	function wrapper({ children }){
		const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		return <MemoryRouter initialEntries={[ '/backoffice/moderators' ]}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</MemoryRouter>;
	}

	const FakeBOPage = () => <div>Backoffice</div>;
	const FakeModeratorsPage = () => <div>Moderators</div>;
	const FakeUserArticlesPage = () => <div>My articles</div>;

	// it('mocks window.location.href', () => {
	// 	expect(getHrefSpy).not.toHaveBeenCalled();
	// 	window.location.href;
	// 	expect(getHrefSpy).toHaveBeenCalled();
	// });

	it('should redirect to user profile if the user is not an admin and try to access admin routes', () => {
 
		setLocalStorage('token', fakeUser.validToken);
		expect(localStorage.getItem('token')).toEqual(JSON.stringify(fakeUser.validToken));

		setLocalStorage('soccer-user', fakeUser.soccerUser);
		expect(localStorage.getItem('soccer-user')).toEqual(JSON.stringify(fakeUser.soccerUser));

		const user = localStorage.getItem('soccer-user');
		const { isAdmin, profileId } = JSON.parse(user); // isAdmin = false

		render(
			<Routes>
				<Route path={`/backoffice/articles/author/${ profileId }`} element={<FakeUserArticlesPage />}/>
				<Route element={<IsAdmin isAdmin={isAdmin} profileId={profileId} />}>
					<Route path="/backoffice/moderators" element={<FakeModeratorsPage />} />
				</Route>
			</Routes>
			, { wrapper });


		// global.window = Object.create(window);
		// const url = '/backoffice/moderators';
		// Object.defineProperty(window, 'location', {
		// 	value: { href: url },
		// 	writable: true, // possibility to override
		// });
		// expect(window.location.href).toEqual(url);  

		// window.location.href = `/backoffice/articles/author/${ profileId }`;

		// expect(window.location.href).toEqual(`/backoffice/articles/author/${ profileId }`); 

		expect(screen.getByText('My articles')).toBeInTheDocument();
	});

	it('should redirect to /backoffice/moderators if the user is an admin and try to access admin routes', () => {
		render(
			<Routes>
				<Route path="/backoffice" element={<FakeBOPage />}/>
				<Route element={<IsAdmin isAdmin={true} />}>
					<Route path="/backoffice/moderators" element={<FakeModeratorsPage />} />
				</Route>
			</Routes>
			, { wrapper });

		expect(screen.getByText('Moderators')).toBeInTheDocument();
	});
});