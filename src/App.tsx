import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
import { Gallery } from './pages/Gallery';

const HomePage: React.FC = () => {
  return (
    <>
      <Presentacion />
      <Events />
      <Schedule />
      <Map />
      <News />
      <Contact />
      <LiveStream />
      <Donations />
    </>
  );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><HomePage /></Layout>,
  },
  {
    path: "/about",
    element: <Layout><AboutUsPage /></Layout>,
  },
  {
    path: "/gallery",
    element: <Layout><Gallery /></Layout>,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
