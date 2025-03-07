// Header.tsx
import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';

export function Header() {
  return (
    <header>
        <Navbar bg="transparent" expand="lg">
        <Container fluid> 
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
            <Nav>  
              <Nav.Link href="#horarios">Horarios</Nav.Link>
              <Nav.Link href="#mapa">Ubicación</Nav.Link>
              <Nav.Link href="#eventos">Eventos</Nav.Link>
              <Nav.Link href="#noticias">Noticias</Nav.Link>
              <Nav.Link href="#contacto">Contacto</Nav.Link>
              <Nav.Link href="#donaciones">Donaciones</Nav.Link>
              <Nav.Link href="#transmisiones">Transmisiones en vivo</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="header-content">
        <Navbar.Brand>
          <Image src="/images/logo_iglesia.jpg" alt="Logo" className="header-logo" />
        </Navbar.Brand>
        <h1>Église Le Reste De Sa Grâce</h1>
      </div>
      
    </header>
  );
}