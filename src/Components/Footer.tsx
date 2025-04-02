import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="py-4">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <p className="mb-2">© {currentYear} Eglise Le Reste De Sa Grace / Iglesia El Remanente De Su Gracia</p>
            <p className="mb-0">Addresse / Dirección: 766 Rue Kirouac, suite 201, Quebec, QC</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}