import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import './i18n/i18n.js';
import { Header } from './Components/Header';
import { Presentacion } from './Components/Presentacion';
import { LiveStream } from './Components/LiveStream';
import { Schedule } from './Components/Schedule';
import { Map } from './Components/Map';
import { Footer } from './Components/Footer';
import { News } from './Components/News';
import { Donations } from './Components/Donations';
import { Contact } from './Components/Contact';
import { AboutUsPage } from './pages/AboutUsPage';
import { Gallery } from './pages/Gallery';

const HomePage: React.FC = () => {
  return (
    <>
      <Presentacion />
      <Schedule />
      <Map />
      <News />
      <LiveStream />
      <Donations />
      <Contact />
    </>
  );
}

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const skip = i18n.language.startsWith('es') ? 'Ir al contenido' : 'Aller au contenu';

  return (
    <div className="App">
      <a className="skip" href="#contenu">{skip}</a>
      <Header />
      <main id="contenu">{children}</main>
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
