import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          {/* Canvas Background Layer */}
          <ParticleCanvas />
          
          {/* Navigation Bar Header */}
          <Navbar />
          
          {/* Route views mappings */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          
          {/* Copyright Footer */}
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
