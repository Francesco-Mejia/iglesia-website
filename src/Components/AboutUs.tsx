import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
      <div className="topics-container">
        <div className="topic-icon" onClick={(e) => { e.stopPropagation(); setSelectedTopic('mision'); }}>
          <img src="/images/mission-icon.png" alt={t('about.mission.title')} />
        </div>
        <div className="topic-icon" onClick={(e) => { e.stopPropagation(); setSelectedTopic('vision'); }}>
          <img src="/images/vision-icon.png" alt={t('about.vision.title')} />
        </div>
        <div className="topic-icon" onClick={(e) => { e.stopPropagation(); setSelectedTopic('valores'); }}>
          <img src="/images/values-icon.png" alt={t('about.values.title')} />
        </div>
      </div>
      {selectedTopic && (
        <div className="topic-text">
          <h3>{topics[selectedTopic].title}</h3>
          <p>{topics[selectedTopic].text}</p>
        </div>
      )}
    </div>
  );
}