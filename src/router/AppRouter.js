import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Area from '../pages/Area/Area';
import Competition from '../pages/Competition/Competition';
import Teams from '../pages/Teams/Teams';
import Match from '../pages/Match/Match';
import Auth from '../pages/Auth/Auth';
import CommentsCol from '../components/Layout/CommentsCol/CommentsCol';
import { Container, Row } from 'react-bootstrap';

import axios from 'axios';
import ProtectedRoutes from '../components/ProtectedRoutes';

// import CommentsContextProvider from '../Context/Context'

axios.defaults.baseURL = 'http://localhost:3001';
const token = localStorage.getItem("token");

const Layout = ({children}) => {
  return(
    <Container className='layout'>
      <Row>
        <CommentsCol />
        {children}
      </Row>
    </Container>
  )
};


const AppRouter = () => {
  
  return (
      <Router>
      <Navbar token={token} />
      <Header />
      <Layout>
        <Routes>
          <Route path="/"  element={<Home /> } />
          <Route path="/teams"  element={<Teams/>} />
          <Route path="/competitions"  element={<Competition/>} />
          <Route path="/matchhistory"  element={<Match/>} />
          <Route path="/news"  element={<Area/>} />
          <Route element={<ProtectedRoutes token={token} />} >
            {/* <Route path="/adminbackoffice"  element={<MyFavorites/>}/> */}
          </Route>
          <Route path="/auth"  element={<Auth/>} />
        </Routes>
      </Layout>
      <Footer />
      </Router>
  )
}

export default AppRouter