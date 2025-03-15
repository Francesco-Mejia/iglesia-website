// Header.tsx
import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'fr' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <header>
        <Navbar bg="transparent" expand="lg">
        <Container fluid> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav>  
              <Nav.Link href="#horarios">{t('header.schedule')}</Nav.Link>
              <Nav.Link href="#nosotros">{t('header.about')}</Nav.Link>
              <Nav.Link href="#mapa">{t('header.location')}</Nav.Link>
              <Nav.Link href="#eventos">{t('header.events')}</Nav.Link>
              <Nav.Link href="#noticias">{t('header.news')}</Nav.Link>
              <Nav.Link href="#contacto">{t('header.contact')}</Nav.Link>
              <Nav.Link href="#donaciones">{t('header.donations')}</Nav.Link>
              <Nav.Link href="#transmisiones">{t('header.livestream')}</Nav.Link>
              <button 
                onClick={toggleLanguage}
                className="language-toggle"
              >
                {i18n.language === 'es' ? 'Français' : 'Español'}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="header-content">
        <Navbar.Brand>
          <Image src="/images/logo_iglesia.jpg" alt="Logo" className="header-logo" />
        </Navbar.Brand>
        <h1>{t('title')}</h1>
      </div>
      
    </header>
  );
}