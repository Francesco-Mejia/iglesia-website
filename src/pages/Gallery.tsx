import React from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '../Components/Reveal';

const photos = [
  '/images/culto7.jpg',
  '/images/culto8.jpg',
  '/images/culto9.jpg',
  '/images/DONS.jpeg',
];

export const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const photoAlt = t('media.worship');
  const videoTitle = t('media.video');

  return (
    <div className="page-offset">
      <Reveal immediate>
        <div className="wrap">
          <h1 className="t-stagger-line t-stagger-line--1">{t('gallery.title')}</h1>
          <div className="gallery-grid reveal-photo">
            {photos.map((src) => (
              <div className="frame" key={src}>
                <img src={src} alt={photoAlt} />
              </div>
            ))}
            <div className="frame">
              <video controls playsInline preload="metadata" title={videoTitle}>
                <source src="/images/Les_difficultés.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Gallery;
