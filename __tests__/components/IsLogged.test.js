// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import IsLogged from '../../src/router/ProtectedRoutes/IsLogged';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from 'react-query';

// describe('IsMod component tests', () => {
// 	function wrapper({ children }){
// 		const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
// 		return <MemoryRouter initialEntries={[ '/backoffice' ]}>
// 			<QueryClientProvider client={queryClient}>
// 				{children}
// 			</QueryClientProvider>
// 		</MemoryRouter>;
// 	}

// 	const FakeHomePage = () => <div>Home</div>;
// 	const FakeBackofficePage = () => <div>Backoffice</div>;
	
// 	// it('should redirect to home page if the user is not authenticated', () => {
// 	// 	render(
// 	// 		<Routes>
// 	// 			<Route path="/" element={<FakeHomePage />}/>
// 	// 			<Route element={<IsLogged auth={false} />}>
// 	// 				<Route path="/backoffice" element={<FakeBackofficePage />} />
// 	// 			</Route>
// 	// 		</Routes>
// 	// 		, { wrapper });

// 	// 	expect(screen.getByText('Home')).toBeInTheDocument();
// 	// 	screen.debug();
// 	// });

// 	// it('should redirect to /backoffice if the user is authenticated', () => {
// 	// 	render(
// 	// 		<Routes>
// 	// 			<Route path="/" element={<FakeHomePage />}/>
// 	// 			<Route element={<IsLogged auth={true} />}>
// 	// 				<Route path="/backoffice" element={<FakeBackofficePage />} />
// 	// 			</Route>
// 	// 		</Routes>
// 	// 		, { wrapper });

// 	// 	expect(screen.getByText('Backoffice')).toBeInTheDocument();
// 	// });
// });

