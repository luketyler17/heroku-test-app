
import './App.css';
import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ViewDetails from './pages/ViewDetails';
import Header from './components/header';
import LandingPage from './pages/LandingPage';


function App() {
  const [token, setToken] = useState(undefined)

  return (
    <div className='wrapper'>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<LandingPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
