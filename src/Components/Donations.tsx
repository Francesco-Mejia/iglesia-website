import React from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

export function Donations() {
  const { t } = useTranslation();
  const CHURCH_INTERAC_EMAIL = 'egliselerestedesagrace@hotmail.com';

  return (
    <Reveal id="donaciones">
      <div className="wrap">
        <h2 className="t-stagger-line t-stagger-line--1">{t('donations.interac.title')}</h2>
        <div className="donate">
          <div className="reveal-photo">
            <img src="/images/INTERAC.jpg" alt="Interac" />
          </div>
          <div>
            <h3>{t('donations.interac.instructions')}</h3>
            <ol>
              <li>{t('donations.interac.steps.0')}</li>
              <li>{t('donations.interac.steps.1')}</li>
              <li>{t('donations.interac.steps.2')}</li>
              <li>{t('donations.interac.steps.3')}</li>
            </ol>
            <p>
              <strong>{t('donations.interac.email')}</strong>{' '}
              <a href={`mailto:${CHURCH_INTERAC_EMAIL}`}>{CHURCH_INTERAC_EMAIL}</a>
            </p>
            <p className="meta">{t('donations.interac.note')}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
