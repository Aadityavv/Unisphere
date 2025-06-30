import React from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import HighlightedEvents from './components/HighlightedEvents';
import AboutUniSphere from './components/AboutUniSphere';
import LoginSignupCTA from './components/LoginSignupCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroBanner />
      <HighlightedEvents />
      <AboutUniSphere />
      <LoginSignupCTA />
      <Footer />
    </div>
  );
}

export default App;