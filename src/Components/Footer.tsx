import React from 'react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="footer">
      <div className="wrap footer-row">
        <p>© {currentYear} {t('footer.names')}</p>
        <p>{t('footer.address')}</p>
        {/* <p className="credit">{t('footer.credit')}</p> */}
      </div>
    </footer>
  );
}
