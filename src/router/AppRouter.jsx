import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { theme as MuiTheme } from 'styles/muiTheme';
import { cssVars } from 'styles/customVars';
import { lazy, Suspense } from 'react';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import {
  Home,
  Competitions,
  Teams,
  Match,
  News,
  Matches,
  NewsPage,
  AccountValidation,
  Login
} from 'pages';
import Layout from 'components/Layout/Main/Main';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from '@mui/material';
import LazyLoad from 'components/Loaders/Lazy/LazyLoad';
import { ErrorBoundary } from 'react-error-boundary';
import Message from 'components/Screens/Message';
import { IsMod, IsAdmin, IsLogged } from './ProtectedRoutes';
import ModalComponent from 'components/Modal/ModalComponent';

const Admin = lazy(() => import('pages/Backoffice/Backoffice'));

const auth = JSON.parse(localStorage.getItem('logged_in_status'));
const isMod = JSON.parse(localStorage.getItem('isMod'));
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

const path = window.location.pathname;

const THEME = createMuiTheme(MuiTheme);
const theme = extendTheme(cssVars);

const AppRouter = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
        <MuiThemeProvider theme={THEME}>
          <Router>
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
                <Route path="/account-validation" element={<AccountValidation />} />
                <Route element={<IsLogged auth={auth} />}>
                  <Route
                    path="/backoffice"
                    element={
                      <ErrorBoundary
                        FallbackComponent={<Message code={'DEFAULT_ERROR'} img={true} />}
                        onReset={() => (window.location.href = '/')}>
                        <Suspense fallback={<LazyLoad />}>
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
                        onReset={() => (window.location.href = '/backoffice')}>
                        <Suspense fallback={<LazyLoad />}>
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
                        <Suspense fallback={<LazyLoad />}>
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
                        <Suspense fallback={<LazyLoad />}>
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
                          onReset={() => (window.location.href = '/backoffice')}>
                          <Suspense fallback={<LazyLoad />}>
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
                          <Suspense fallback={<LazyLoad />}>
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
                          <Suspense fallback={<LazyLoad />}>
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
