import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useTranslation } from 'react-i18next';
import './i18n/i18n.js';
import { Header } from './Components/Header';
import { Presentacion } from './Components/Presentacion';
import { LiveStream } from './Components/LiveStream';
import { Schedule } from './Components/Schedule';
import { Map } from './Components/Map';
import { Footer } from './Components/Footer';
import { Events } from './Components/Events';
import { News } from './Components/News';
import { Donations } from './Components/Donations';
import { Contact } from './Components/Contact';
import { AboutUsPage } from './pages/AboutUsPage';

function HomePage() {
  return (
    <>
      <Presentacion /><Events />
      <Schedule />
      
      <Map />
      <News />
      <Contact />
      <LiveStream />
      <Donations />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
