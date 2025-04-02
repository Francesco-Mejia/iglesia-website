import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

type TopicKey = 'mision' | 'vision' | 'valores';

export function AboutUs() {
  const [selectedTopic, setSelectedTopic] = useState<TopicKey | null>(null);
  const { t } = useTranslation();

  const topics: { [key in TopicKey]: { title: string; text: string } } = {
    mision: {
      title: t('about.mission.title'),
      text: t('about.mission.text'),
    },
    vision: {
      title: t('about.vision.title'),
      text: t('about.vision.text'),
    },
    valores: {
      title: t('about.values.title'),
      text: t('about.values.text'),
    },
  };

  const handleBackgroundClick = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="about-us-container" id="nosotros" onClick={handleBackgroundClick}>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="text-center mb-4">
            <div className="topic-icon" onClick={(e) => { e.stopPropagation(); setSelectedTopic('valores'); }}>
              <img src="/images/values2-icon.png" alt={t('about.values.title')} className="img-fluid" />
            </div>
          </Col>
          <Col xs={12} md={4} className="text-center mb-4">
            <div className="topic-icon" onClick={(e) => { e.stopPropagation(); setSelectedTopic('mision'); }}>
              <img src="/images/mission-icon2.png" alt={t('about.mission.title')} className="img-fluid" />
            </div>
          </Col>
          <Col xs={12} md={4} className="text-center mb-4">
            <div className="topic-icon" onClick={(e) => { e.stopPropagation(); setSelectedTopic('vision'); }}>
              <img src="/images/vision-icon2.png" alt={t('about.vision.title')} className="img-fluid" />
            </div>
          </Col>
        </Row>
        {selectedTopic && (
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <div className="topic-text">
                <h3>{topics[selectedTopic].title}</h3>
                <p>{topics[selectedTopic].text}</p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}