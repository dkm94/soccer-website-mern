import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { Layout, Footer, Navbar } from 'components/Layout';
import { LazyLoader } from 'components/Loaders';
import Message from 'components/Screens/Message';
import { Competitions,
	Teams,
	Match,
	Matches,
	AccountValidation,
	Login,
	News,
	NewsPage
	, Home } from 'pages';
import { IsMod, IsAdmin, IsLogged } from 'router/ProtectedRoutes';
import { ScrollToTop } from 'components/utils';

const Admin = lazy(() => import('pages/Backoffice/Backoffice'));

const auth = JSON.parse(localStorage.getItem('logged_in_status'));
const isMod = JSON.parse(localStorage.getItem('isMod'));
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

const path = window.location.pathname;

const App = () => {

	return (
		<>
			<ScrollToTop />
			<Navbar auth={auth} />
			<Layout path={path}>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/teams" element={<Teams />} />
					<Route path="/competitions" element={<Competitions />} />
					<Route path="/competitions/:code/matches" element={<Matches />} />
					<Route path="/matchhistory" element={<Match />} />
					<Route path="/news" element={<News />} />
					<Route path="/news/:code/:id" element={<NewsPage />} />
					<Route path="/secret-login" element={<Login auth={auth} />} />
					<Route path="/account-validation" element={<AccountValidation auth={auth} />} />
					<Route element={<IsLogged auth={auth} />}>
						<Route
							path="/backoffice"
							element={
								<ErrorBoundary
									FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
									onReset={() => (window.location.href = '/')}>
									<Suspense fallback={<LazyLoader />}>
										<Admin path={path} />
									</Suspense>
								</ErrorBoundary>
							}
						/>
						<Route
							path="/backoffice/articles/author/:id"
							element={
								<ErrorBoundary
									FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
									onReset={() => (window.location.href = '/backoffice')}>
									<Suspense fallback={<LazyLoader />}>
										<Admin />
									</Suspense>
								</ErrorBoundary>
							}
						/>
						<Route
							path="/backoffice/profile/:id"
							element={
								<ErrorBoundary
									FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
									onReset={() => (window.location.href = '/backoffice')}>
									<Suspense fallback={<LazyLoader />}>
										<Admin />
									</Suspense>
								</ErrorBoundary>
							}
						/>
						<Route element={<IsAdmin isAdmin={isAdmin} />}>
							<Route
								path="/backoffice/moderators"
								element={
									<ErrorBoundary
										FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
										onReset={() => (window.location.pathname = '/backoffice')}>
										<Suspense fallback={<LazyLoader />}>
											<Admin />
										</Suspense>
									</ErrorBoundary>
								}
							/>
						</Route>
						<Route element={<IsMod isMod={isMod} />}>
							<Route
								path="/backoffice/articles/create"
								element={
									<ErrorBoundary
										FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
										onReset={() => (window.location.href = '/backoffice')}>
										<Suspense fallback={<LazyLoader />}>
											<Admin />
										</Suspense>
									</ErrorBoundary>
								}
							/>
							<Route
								path="/backoffice/articles/edit/:id"
								element={
									<ErrorBoundary
										FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
										onReset={() => (window.location.href = '/backoffice')}>
										<Suspense fallback={<LazyLoader />}>
											<Admin />
										</Suspense>
									</ErrorBoundary>
								}
							/>
						</Route>
					</Route>
				</Routes>
			</Layout>
			<Footer />
		</>
	);
};

export default App;
