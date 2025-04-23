import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';

export const Gallery: React.FC = () => {
  const { t } = useTranslation();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const media = [
    { src: '/images/logo_iglesia.jpg', description: 'Logo de notre église' },
    { src: '/images/culto7.jpg', description: 'Moment de culte et adoration' },
    { src: '/images/culto8.jpg', description: 'Célébration communautaire' },
    { src: '/images/Les_difficultés.mp4', description: 'Vidéo sur les difficultés' },
  ];

  const isVideo = (path: string) => {
    return path.toLowerCase().endsWith('.mp4');
  };

  return (
    <div className="gallery-container">
      <h1>{t('gallery.title')}</h1>
      <div className="gallery-slider">
        <Slider {...settings}>
          {media.map((item, index) => (
            <div key={index} className="media-item">
              {isVideo(item.src) ? (
                <video 
                  controls 
                  autoPlay={false}
                  muted
                  style={{ maxWidth: '100%', height: 'auto' }}
                  title={item.description}
                >
                  <source src={item.src} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              ) : (
                <img 
                  src={item.src} 
                  alt={item.description}
                  aria-label={item.description}
                />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery; 