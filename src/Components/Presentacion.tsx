import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

export function Presentacion()
{
  const { t } = useTranslation();

  return (
    <div className="presentacion-container">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <div className="presentacion-content">
              <p className="mensaje">{t('presentation.message')}</p>
              <p className="pasaje">{t('presentation.verse')}</p>
              <p className="invitacion">{t('presentation.invitation')}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}