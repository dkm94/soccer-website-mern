// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import IsAdmin from '../../src/router/ProtectedRoutes/IsAdmin';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';

// describe('IsAdmin component tests', () => {
// 	function wrapper({ children }){
// 		const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
// 		return <MemoryRouter initialEntries={[ '/backoffice/moderators' ]}>
// 			<QueryClientProvider client={queryClient}>
// 				{children}
// 			</QueryClientProvider>
// 		</MemoryRouter>;
// 	}

// 	const FakeBOPage = () => <div>Backoffice</div>;
// 	const FakeModeratorsPage = () => <div>Moderators</div>;

// 	it('should redirect to /backoffice if the user is not an admin and try to access admin routes', () => {
// 		render(
// 			<Routes>
// 				<Route path="/backoffice" element={<FakeBOPage />}/>
// 				<Route element={<IsAdmin isAdmin={false} />}>
// 					<Route path="/backoffice/moderators" element={<FakeModeratorsPage />} />
// 				</Route>
// 			</Routes>
// 			, { wrapper });

// 		expect(screen.getByText('Backoffice')).toBeInTheDocument();
// 	});

// 	it('should redirect to /backoffice/moderators if the user is an admin and try to access admin routes', () => {
// 		render(
// 			<Routes>
// 				<Route path="/backoffice" element={<FakeBOPage />}/>
// 				<Route element={<IsAdmin isAdmin={true} />}>
// 					<Route path="/backoffice/moderators" element={<FakeModeratorsPage />} />
// 				</Route>
// 			</Routes>
// 			, { wrapper });

// 		expect(screen.getByText('Moderators')).toBeInTheDocument();
// 	});
// });