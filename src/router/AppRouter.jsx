import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Competitions from '../pages/Competitions/Competitions';
import Teams from '../pages/Teams/Teams';
import Match from '../pages/Match/Match';
import News from '../pages/News/News';
import CompetitionsTeams from '../pages/Competitions/Teams/Teams';
// import Auth from '../pages/Auth/Auth';
import Layout from '../components/Layout/Main/Main';
import ProtectedRoutes from '../components/ProtectedRoutes';
import Matches from '../pages/Competitions/Matches/Matches';
import Login from '../pages/Login/Login';
import Backoffice from '../pages/Backoffice/Backoffice';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
// import Login from '../components/Auth/Login/Login';

const token = localStorage.getItem('token');
const path = window.location.pathname;

const THEME = createMuiTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          fontFamily: `'Nunito', sans-serif`,
          fontSize: 14
        }
      }
    }
  },
  palette: {
    primary: {
      main: '#a00404'
    },
    secondary: {
      main: '#BCC3CA'
    }
  },
  typography: {
    fontFamily: `'Nunito', sans-serif`,
    h2: {
      fontSize: '1rem'
    },
    h6: {
      fontWeight: 600
    },
    body1: {
      fontSize: '0.8rem'
    },
    body2: {
      fontSize: '0.75rem'
    }
  }
});

const AppRouter = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={THEME}>
        <Router>
          <Navbar token={token} />
          <Layout path={path}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/teams" element={<Teams />} />
              <Route path="/competitions" element={<Competitions />} />
              <Route path="/competitions/:id/teams" element={<CompetitionsTeams />} />
              <Route path="/competitions/:code/matches" element={<Matches />} />
              <Route path="/matchhistory" element={<Match />} />
              <Route path="/news" element={<News />} />
              <Route path="/secret-login" element={<Login />} />
              <Route element={<ProtectedRoutes token={token} />}>
                <Route path="/backoffice" element={<Backoffice />} />
              </Route>
              {/* <Route path="/auth"  element={<Auth/>} /> */}
            </Routes>
          </Layout>
          <Footer />
        </Router>
      </MuiThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppRouter;