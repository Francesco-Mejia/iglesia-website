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
    '/images/logo_iglesia.jpg',
    '/images/culto7.jpg',
    '/images/culto8.jpg',
    '/images/Les_difficultés.mp4',
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
              {isVideo(item) ? (
                <video 
                  controls 
                  autoPlay={false}
                  muted
                  style={{ maxWidth: '100%', height: 'auto' }}
                >
                  <source src={item} type="video/mp4" />
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              ) : (
                <img src={item} alt={`Photo de l'église ${index + 1}`} />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery; 