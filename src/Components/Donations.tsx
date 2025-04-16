import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

export function Donations() {
  const { t } = useTranslation();
  const CHURCH_INTERAC_EMAIL = "egliselerestedesagrace@hotmail.com";
  const INTERAC_PASSWORD = "eglise2025"; // Mot de passe pour les virements non-automatisés

  return (
    <div className="donations-container" id="donaciones">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <div className="interac-section">
              <div className="interac-header">
                <h3 className="text-center mb-4">{t('donations.interac.title')}</h3>
                <img 
                  src="/images/INTERAC.jpg" 
                  alt="Interac" 
                  className="interac-logo"
                />
              </div>
              
              <div className="instructions mb-4">
                <h4>{t('donations.interac.instructions')}</h4>
                <ol>
                  <li>{t('donations.interac.steps.0')}</li>
                  <li>{t('donations.interac.steps.1')}</li>
                  <li>{t('donations.interac.steps.2')}</li>
                  <li>{t('donations.interac.steps.3')}</li>
                </ol>
                
                <div className="church-interac-info">
                  <p><strong>{t('donations.interac.email')}</strong> {CHURCH_INTERAC_EMAIL}</p>
                  <p className="note">{t('donations.interac.note')}</p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}