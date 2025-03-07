import React from 'react';

export function Footer() 
{
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <p>© {currentYear} Eglise Le Reste De Sa Grace / Iglesia El Remanente De Su Gracia</p>
      <p>Addresse / Dirección: 766 Rue Kirouac, suite 201, Quebec, QC</p>
    </footer>
  );
}