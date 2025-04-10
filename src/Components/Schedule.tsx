import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function Schedule() 
{
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const schedule = [
    { day: t('schedule.wednesday'), time: '18:45 - 20h30', languages: t('schedule.languages') },
    { day: t('schedule.sunday'), time: '10:00 - 12h30', languages: t('schedule.languages') },
    { day: t('schedule.sunday'), time: '16:45 - 18h45', languages: t('schedule.languages') },
  ];

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div id='horarios' className="schedule-section">
      <div className="schedule-decoration-top">
        <div className="decoration-line"></div>
        <div className="decoration-circle"></div>
        <div className="decoration-line"></div>
      </div>
      <Container>
        <Row className="justify-content-center">
          
          <Col xs={12} md={8} lg={6} className="position-relative">
            <div className="schedule-card">
              <div className="schedule-card-content">
                <div className="schedule-icon-container">
                  <i className="fas fa-door-open"></i>
                </div>
                <Button 
                  onClick={handleShow} 
                  className="schedule-button w-100"
                >
                  <span className="schedule-button-text">{t('schedule.viewSchedule')}</span>
                  <div className="schedule-button-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                </Button>
              
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="schedule-decoration-bottom">
        <div className="decoration-line"></div>
        <div className="decoration-circle"></div>
        <div className="decoration-line"></div>
      </div>

      <Modal 
        show={showModal} 
        onHide={handleClose}
        centered
        className="schedule-modal"
        backdropClassName="schedule-modal-backdrop"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('header.schedule')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="schedule-table">
            {schedule.map((item, index) => (
              <div key={index} className="schedule-row">
                <div className="schedule-cell">{item.day}</div>
                <div className="schedule-cell">{item.time}</div>
                <div className="schedule-cell">{item.languages}</div>
              </div>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}