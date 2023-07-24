import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Experimental_CssVarsProvider as CssVarsProvider,
	experimental_extendTheme as extendTheme } from '@mui/material';

import { Layout, Footer, Navbar } from 'components/Layout';
import { LazyLoader } from 'components/Loaders';
import ModalComponent from 'components/Modal/ModalComponent';
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
import cssVars from 'styles/customVars';
import muiTheme from 'styles/muiTheme';
import { ScrollToTop } from 'components/utils';

const Admin = lazy(() => import('pages/Backoffice/Backoffice'));

const auth = JSON.parse(localStorage.getItem('logged_in_status'));
const isMod = JSON.parse(localStorage.getItem('isMod'));
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

const path = window.location.pathname;

const THEME = createMuiTheme(muiTheme);
const theme = extendTheme(cssVars);

const AppRouter = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<CssVarsProvider theme={theme}>
				<MuiThemeProvider theme={THEME}>
					<Router>
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
										path="/backoffice/articles"
										element={
											<ErrorBoundary
												FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
												onReset={() => (window.location.href = '/backoffice/moderators')}>
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
												onReset={() => (window.location.href = '/backoffice/moderators')}>
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
												onReset={() => (window.location.href = '/backoffice/moderators')}>
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
													onReset={() => (window.location.pathname = '/backoffice/moderators')}>
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
													onReset={() => (window.location.href = '/backoffice/moderators')}>
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
													onReset={() => (window.location.href = '/backoffice/moderators')}>
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
					</Router>
					<div className="clipping-container">
						<ModalComponent />
					</div>
				</MuiThemeProvider>
			</CssVarsProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default AppRouter;
