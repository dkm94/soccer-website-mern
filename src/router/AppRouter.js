import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Competitions from '../pages/Competitions/Competitions';
import Teams from '../pages/Teams/Teams';
import Match from '../pages/Match/Match';
import News from "../pages/News/News";
import CompetitionsTeams from '../pages/Competitions/Teams/Teams';
// import Auth from '../pages/Auth/Auth';
import Layout from '../components/Layout/Main/Main';
import ProtectedRoutes from '../components/ProtectedRoutes';
import Matches from '../pages/Competitions/Matches/Matches';
import Login from '../pages/Login/Login';
import Backoffice from '../pages/Backoffice/Backoffice';
// import Login from '../components/Auth/Login/Login';

const token = localStorage.getItem("token");
const path = window.location.pathname;

const AppRouter = () => {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
      <Navbar token={token} />
      <Layout path={path}>
        <Routes>
          <Route path="/"  element={<Home /> } />
          <Route path="/teams"  element={<Teams/>} />
          <Route path="/competitions"  element={<Competitions/>} />
          <Route path="/competitions/:id/teams"  element={<CompetitionsTeams/>} />
          <Route path="/competitions/:code/matches"  element={<Matches/>} />
          <Route path="/matchhistory"  element={<Match/>} />
          <Route path="/news"  element={<News/>} />
          <Route path="/secret-login"  element={<Login />} />
            <Route element={<ProtectedRoutes token={token} />} >
          </Route>
          <Route path="/backoffice"  element={<Backoffice />}/>
          {/* <Route path="/auth"  element={<Auth/>} /> */}
        </Routes>
      </Layout>
      <Footer />
      </Router>
    </QueryClientProvider>
  )
}

export default AppRouter