// Header.tsx
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <Navbar expand="lg" className="navigation-bar">
        <Container>
          <div className="d-flex align-items-center w-100">
            <Navbar.Toggle 
              aria-controls="basic-navbar-nav" 
              className="me-3"
              onClick={handleToggle}
            />
            <div className="logo-section">
              <Link to="/" className="logo-link">
                <img
                  src="/images/logo_iglesia.jpg"
                  alt="Logo"
                  className="header-logo"
                />
              </Link>
            </div>
            <Navbar.Collapse 
              id="basic-navbar-nav" 
              className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}
            >
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/" onClick={() => setIsMenuOpen(false)}>{t('header.home')}</Nav.Link>
                <Nav.Link href="#horarios" onClick={() => setIsMenuOpen(false)}>{t('header.schedule')}</Nav.Link>
                <Nav.Link href="#ubicacion" onClick={() => setIsMenuOpen(false)}>{t('header.location')}</Nav.Link>
                <Nav.Link href="#eventos" onClick={() => setIsMenuOpen(false)}>{t('header.events')}</Nav.Link>
                <Nav.Link href="#noticias" onClick={() => setIsMenuOpen(false)}>{t('header.news')}</Nav.Link>
                <Nav.Link href="#contacto" onClick={() => setIsMenuOpen(false)}>{t('header.contact')}</Nav.Link>
                <Nav.Link href="#transmisiones" onClick={() => setIsMenuOpen(false)}>{t('header.livestream')}</Nav.Link>
                <Nav.Link href="#donaciones" onClick={() => setIsMenuOpen(false)}>{t('header.donations')}</Nav.Link>
                <Nav.Link as={Link} to="/about" onClick={() => setIsMenuOpen(false)}>{t('header.about')}</Nav.Link>
              </Nav>
              <button 
                className="language-toggle ms-3" 
                onClick={() => {
                  changeLanguage();
                  setIsMenuOpen(false);
                }}
              >
                {i18n.language === 'es' ? 'Français' : 'Español'}
              </button>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </header>
  );
}