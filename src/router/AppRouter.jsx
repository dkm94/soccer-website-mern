import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Competitions from '../pages/Competitions/Competitions';
import Teams from '../pages/Teams/Teams';
import Match from '../pages/Match/MatchHistory';
import News from '../pages/News/News';
import Layout from '../components/Layout/Main/Main';
import IsLogged from './ProtectedRoutes/IsLogged';
import Matches from '../pages/Competitions/Matches/Matches';
import Login from '../pages/Login/Login';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme
} from '@mui/material';
import { theme as MuiTheme } from '../styles/muiTheme';
import { cssVars } from '../styles/customVars';
import { lazy, Suspense } from 'react';
const Admin = lazy(() => import('../pages/Backoffice/Backoffice'));
import LazyLoad from '../components/Loaders/Lazy/LazyLoad';
import { ErrorBoundary } from 'react-error-boundary';
import Message from '../components/Screens/Message';
import IsMod from './ProtectedRoutes/IsMod';
import NewsPage from '../pages/NewsPage/NewsPage';

const auth = JSON.parse(localStorage.getItem('logged_in_status'));
const isMod = JSON.parse(localStorage.getItem('isMod'));

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
                <Route path="/" element={<Home />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/competitions" element={<Competitions />} />
                <Route path="/competitions/:code/matches" element={<Matches />} />
                <Route path="/matchhistory" element={<Match />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:code/:id" element={<NewsPage />} />
                <Route path="/secret-login" element={<Login />} />
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
                          <Admin />
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
        </MuiThemeProvider>
      </CssVarsProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppRouter;
