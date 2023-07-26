import React from 'react';
import { render, screen } from '@testing-library/react';
import IsMod from '../../src/router/ProtectedRoutes/IsMod';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

describe('IsMod component tests', () => {
	function wrapper({ children }){
		const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
		return <MemoryRouter initialEntries={[ '/backoffice/articles/create' ]}>
			<QueryClientProvider client={queryClient}>
				{children}
			</QueryClientProvider>
		</MemoryRouter>;
	}

	const FakeBOPage = () => <div>Backoffice</div>;
	const FakeCreateArticlePage = () => <div>Create article</div>;
	
	it('should redirect to /backoffice if the user is not a moderator and try to access moderator routes', () => {
		render(
			<Routes>
				<Route path="/backoffice" element={<FakeBOPage />}/>
				<Route element={<IsMod isMod={false} />}>
					<Route path="/backoffice/articles/create" element={<FakeCreateArticlePage />} />
				</Route>
			</Routes>
			, { wrapper });

		expect(screen.getByText('Backoffice')).toBeInTheDocument();
	});

	it('should redirect to /backoffice/articles/create if the user a moderator and try to access moderator routes', () => {
		render(
			<Routes>
				<Route path="/backoffice" element={<FakeBOPage />}/>
				<Route element={<IsMod isMod={true} />}>
					<Route path="/backoffice/articles/create" element={<FakeCreateArticlePage />} />
				</Route>
			</Routes>
			, { wrapper });

		expect(screen.getByText('Create article')).toBeInTheDocument();
	});
});

