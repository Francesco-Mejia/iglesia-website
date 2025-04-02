// Header.tsx
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'fr' : 'es');
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top"
      className={`navbar-custom ${isScrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/images/logo_iglesia.jpg"
            alt="Logo"
            className="header-logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">{t('header.home')}</Nav.Link>            
            <Nav.Link href="#horarios">{t('header.schedule')}</Nav.Link>
            <Nav.Link href="#ubicacion">{t('header.location')}</Nav.Link>
            <Nav.Link href="#noticias">{t('header.news')}</Nav.Link>
            <Nav.Link href="#contacto">{t('header.contact')}</Nav.Link>
            <Nav.Link href="#transmisiones">{t('header.livestream')}</Nav.Link>
            <Nav.Link href="#donaciones">{t('header.donations')}</Nav.Link>
            <Nav.Link as={Link} to="/about">{t('header.about')}</Nav.Link>
          </Nav>
          <button 
            className="language-toggle ms-lg-3" 
            onClick={changeLanguage}
          >
            {i18n.language === 'es' ? 'Français' : 'Español'}
          </button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}