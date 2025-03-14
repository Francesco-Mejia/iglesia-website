import React from 'react';
import { useTranslation } from 'react-i18next';

export function Contact() {
  const { t } = useTranslation();

  const openFacebookPage = (url: string) => {
    window.open(url, '_blank');
  };

  const openYouTubeChannel = (url: string) => {
    window.open(url, '_blank');
  };

  const openEmailClient = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="contact-container" id="contacto">
      <div className="contact-header">
        <h2>{t('contact.title')}</h2>
      </div>
      <div className="social-icons">
        <div className='social-icon'>
            <img 
              src='/images/email-icon.png' 
              alt="Email" 
              onClick={() => openEmailClient('scristosalva@hotmail.fr')}
            />
        </div>
        <div className="social-icon">
          <img
            src="/images/youtube-icon.png"
            alt="YouTube"
            onClick={() => openYouTubeChannel('https://www.youtube.com/@HectorLuisVente/featured')}
          />
        </div>
        <div className="social-icon">
          <img
            src="/images/facebook.png"
            alt="Facebook"
            onClick={() => openFacebookPage('https://www.facebook.com/egliselerestedesagrace/?locale=es_LA')}
          />
        </div>
      </div>
    </div>
  );
}