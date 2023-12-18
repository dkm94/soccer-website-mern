import React, { lazy, Suspense, useState } from 'react';
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
	, Home, NotFound } from 'pages';
import { IsMod, IsAdmin, IsLogged } from 'router/ProtectedRoutes';
import { ScrollToTop } from 'components/utils';
import ImageBlur from 'components/ui/ImageBlur/ImageBlur';

const Admin = lazy(() => import('pages/Backoffice/Backoffice'));

const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('soccer-user'));
let isAdmin; 
let isMod;
let profileId;
if(user){
	isAdmin = user.isAdmin;
	isMod = user.isMod;
	profileId = user.profileId;
}

const path = window.location.pathname;

const staticImage = 'src/images/301 Moved Permanently.jpeg';
const dynamicImage = 'https://res.cloudinary.com/dbj8kfftk/image/upload/q_100/v1/soccer-articles/aqj24cyx8gdxtiob6cpg?_a=BAJFJtWI0';

const App = () => {
	const [ invalidPath, setInvalidPath ] = useState(false);

	return (
		<>
			<ScrollToTop />
			<Navbar token={token} user={user} />
			<Layout path={path} invalidPath={invalidPath}>
				<Routes>
					<Route path="/" element={<Navigate to="/home" />} />
					<Route path="/home" element={<Home />} />
					<Route path="/teams" element={<Teams />} />
					<Route path="/competitions" element={<Competitions />} />
					<Route path="/competitions/:code/matches" element={<Matches />} />
					<Route path="/matchhistory" element={<Match />} />
					<Route path="/news" element={<News />} />
					<Route path="/news/:code/:id" element={<NewsPage />} />
					<Route path="/secret-login" element={<Login auth={user} />} />
					<Route path="/account-validation" element={<AccountValidation auth={user} />} />
					<Route path="*" element={<NotFound invalidPath={invalidPath} setInvalidPath={setInvalidPath} />} />
					<Route element={<IsLogged token={token} />}>
						<Route
							path="/backoffice/articles/author/:id"
							element={
								<ErrorBoundary
									FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
									onReset={() => (window.location.href = '/backoffice')}>
									<Suspense fallback={<LazyLoader />}>
										<Admin path={path} user={user} />
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
										<Admin path={path} user={user} />
									</Suspense>
								</ErrorBoundary>
							}
						/>
						<Route element={<IsAdmin isAdmin={isAdmin} profileId={profileId} />}>
							<Route
								path="/backoffice/moderators"
								element={
									<ErrorBoundary
										FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
										onReset={() => (window.location.pathname = '/backoffice')}>
										<Suspense fallback={<LazyLoader />}>
											<Admin path={path} user={user} />
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
											<Admin path={path} user={user} />
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
											<Admin path={path} user={user} />
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
