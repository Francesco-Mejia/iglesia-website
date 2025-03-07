import React from 'react';

export function Contact() {
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
        <h2>Contáctanos</h2>
      </div>
      <div className="social-icons">
        <div className='social-icon'>
            <img 
              src='/images/email-icon.png' 
              alt="Correo electrónico" 
              onClick={() => openEmailClient('scristosalva@hotmail.fr')}
            />
            <p>scristosalva@hotmail.fr</p>
        </div>
        <div className="social-icon">
          <img
            src="/images/facebook.png"
            alt="Facebook Iglesia"
            onClick={() => openFacebookPage('https://www.facebook.com/egliselerestedesagrace/?locale=es_LA')}
          />
          <p>Facebook Iglesia</p>
        </div>
        <div className="social-icon">
          <img
            src="/images/facebook.png"
            alt="Facebook Pastor"
            onClick={() => openFacebookPage('https://www.facebook.com/HectorLuisVente')}
          />
          <p>Facebook Pastor</p>
        </div>
        <div className="social-icon">
          <img
            src="/images/youtube.jpg"
            alt="YouTube"
            onClick={() => openYouTubeChannel('https://www.youtube.com/@HectorLuisVente/featured')}
          />
          <p>YouTube</p>
        </div>
      </div>
    </div>
  );
}