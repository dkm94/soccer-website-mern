import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Home from '../pages/Home/Home';
import Players from '../pages/Players/Players';
import Area from '../pages/Area/Area';
import Competition from '../pages/Competition/Competition';
import Teams from '../pages/Teams/Teams';
import Match from '../pages/Match/Match';

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Header />
      <Routes>
        <Route path="/"  element={<Home/>} />
        <Route path="/players"  element={<Players/>} />
        <Route path="/area"  element={<Area/>} />
        <Route path="/competition"  element={<Competition/>} />
        <Route path="/teams"  element={<Teams/>} />
        <Route path="/match"  element={<Match/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default AppRouter