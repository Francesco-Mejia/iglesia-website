import React from 'react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const openFacebookPage = (url: string) => {
    window.open(url, '_blank');
  };

  const openYouTubeChannel = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <footer id='footer'>
      <p>&copy; {currentYear} Eglise Le Reste De Sa Grace / Iglesia El Remanente De Su Gracia</p>
      <p>Addresse / Dirección: 766 Rue Kirouac, suite 201, Quebec, QC</p>
      <p>Email / Correo electrónico: scristosalva@hotmail.fr</p>
      <div className="social-icons">
        <img
            src="/images/facebook.png"
            alt="Facebook Iglesia"
            onClick={() => openFacebookPage('https://www.facebook.com/egliselerestedesagrace/?locale=es_LA')}
            style={{ cursor: 'pointer', width: '30px', height: '30px' }}
        />
        <p>Facebook Iglesia</p>
        <img
            src="/images/facebook.png"
            alt="Facebook Pastor"
            onClick={() => openFacebookPage('https://www.facebook.com/HectorLuisVente')}
            style={{ cursor: 'pointer', width: '30px', height: '30px' }}
        />
        <p>Facebook Pastor</p>
        <img
            src="/images/youtube.jpg"
            alt="YouTube"
            onClick={() => openYouTubeChannel('https://www.youtube.com/@HectorLuisVente/featured')}
            style={{ cursor: 'pointer', width: '40px', height: '30px' }}
        />
        <p>YouTube</p>
      </div>
    </footer>
  );
}