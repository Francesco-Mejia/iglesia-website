import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

export function Contact() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: '/images/email-icon.png',
      alt: 'Email',
      action: () => window.location.href = 'mailto:scristosalva@hotmail.fr',
      ariaLabel: 'Envoyer un email'
    },
    {
      icon: '/images/youtube-icon.png',
      alt: 'YouTube',
      action: () => window.open('https://www.youtube.com/@HectorLuisVente/featured', '_blank'),
      ariaLabel: 'Visiter notre chaîne YouTube'
    },
    {
      icon: '/images/facebook.png',
      alt: 'Facebook',
      action: () => window.open('https://www.facebook.com/egliselerestedesagrace/?locale=es_LA', '_blank'),
      ariaLabel: 'Visiter notre page Facebook'
    },
    {
      icon: '/images/IG-LOGO.png',
      alt: 'Instagram',
      action: () => window.open('https://www.instagram.com/egliselerestedesagrace?igsh=NmJ3NjN4bTQ3czBn&utm_source=qr', '_blank'),
      ariaLabel: 'Visiter notre profil Instagram'
    }
  ];

  return (
    <section className="contact-section" id="contacto">
      <Container fluid className="contact-container">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center mb-4">
            <h2 className="contact-title">{t('contact.title')}</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12}>
            <div className="social-icons-container">
              {socialLinks.map((link, index) => (
                <div 
                  key={index} 
                  className="social-icon-wrapper"
                  onClick={link.action}
                  role="button"
                  aria-label={link.ariaLabel}
                >
                  <img 
                    src={link.icon} 
                    alt={link.alt}
                    className="social-icon-img"
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}