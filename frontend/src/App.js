import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import InterestAccruals from './pages/InterestAccruals';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/interest-accruals" element={<InterestAccruals />} />
        </Routes>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Bank Management System. All rights reserved.</p>
      </footer>
    </Router>
  );
}

export default App;
