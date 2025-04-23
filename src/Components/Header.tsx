// Header.tsx
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

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
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <Navbar 
        expand="lg" 
        className="navigation-bar"
        expanded={expanded}
      >
        <Container>
          <div className="header-content">
            <Navbar.Toggle 
              aria-controls="basic-navbar-nav" 
              onClick={() => setExpanded(!expanded)}
            />
            
            <div className="logo-section">
              <Link to="/" className="logo-link" onClick={() => setExpanded(false)}>
                <img
                  src="/images/logo_iglesia.jpg"
                  alt="Logo"
                  className="header-logo"
                />
              </Link>
            </div>

            <button 
              className="language-toggle"
              onClick={changeLanguage}
            >
              {i18n.language === 'es' ? 'Français' : 'Español'}
            </button>
          </div>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>{t('header.home')}</Nav.Link>
              <Nav.Link href="#horarios" onClick={() => setExpanded(false)}>{t('header.schedule')}</Nav.Link>
              <Nav.Link href="#ubicacion" onClick={() => setExpanded(false)}>{t('header.location')}</Nav.Link>
              <Nav.Link href="#transmisiones" onClick={() => setExpanded(false)}>{t('header.livestream')}</Nav.Link>
              <Nav.Link href="#donaciones" onClick={() => setExpanded(false)}>{t('header.donations')}</Nav.Link>
              <Nav.Link as={Link} to="/gallery" onClick={() => setExpanded(false)}>{t('header.gallery')}</Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>{t('header.about')}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}