import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Modal } from 'react-bootstrap';

type TopicKey = 'mision' | 'vision' | 'valores';

export function AboutUsPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
  const { t } = useTranslation();

  const topics: { [key in TopicKey]: { title: string; text: string; icon: string } } = {
    mision: {
      title: t('about.mission.title'),
      text: t('about.mission.text'),
      icon: '/images/bible-icon.png'
    },
    vision: {
      title: t('about.vision.title'),
      text: t('about.vision.text'),
      icon: '/images/VISION2.png'
    },
    valores: {
      title: t('about.values.title'),
      text: t('about.values.text'),
      icon: '/images/values2-icon.png'
    }
  };

  const handleClose = () => setSelectedTopic(null);

  return (
    <div className="about-page">
      <div className="about-hero">
        <Container>
          <h1 className="about-title">{t('about.title')}</h1>
        </Container>
      </div>

      <Container className="about-content">
        <Row className="justify-content-center g-4">
          {Object.entries(topics).map(([key, topic]) => (
            <Col key={key} xs={12} md={4}>
              <div 
                className="topic-card"
                onClick={() => setSelectedTopic(key as TopicKey)}
              >
                <div className="topic-icon-wrapper">
                  <img 
                    src={topic.icon} 
                    alt={topic.title}
                    className="topic-icon-img"
                  />
                </div>
                <h3 className="topic-title">{topic.title}</h3>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal 
        show={selectedTopic !== null} 
        onHide={handleClose}
        centered
        size="lg"
        className="topic-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedTopic && topics[selectedTopic].title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTopic && (
            <div className="topic-content">
              <img 
                src={topics[selectedTopic].icon}
                alt={topics[selectedTopic].title}
                className="topic-modal-icon"
              />
              <p className="topic-text">{topics[selectedTopic].text}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
} 