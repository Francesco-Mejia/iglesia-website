import React from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

const STEP_KEYS = [0, 1, 2, 3] as const;

export function Donations() {
  const { t } = useTranslation();
  const CHURCH_INTERAC_EMAIL = 'egliselerestedesagrace@hotmail.com';

  return (
    <Reveal id="donaciones">
      <div className="wrap">
        <h2 className="t-stagger-line t-stagger-line--1">{t('donations.interac.title')}</h2>
        <div className="donate">
          <div className="frame t-stagger-line t-stagger-line--2">
            <img src="/images/INTERAC.jpg" alt="Interac" />
          </div>
          <div>
            <h3 className="t-stagger-line t-stagger-line--3">{t('donations.interac.instructions')}</h3>
            <ol className="donate-steps">
              {STEP_KEYS.map((key, index) => (
                <li key={key} className={`t-stagger-line t-stagger-line--${index + 4}`}>
                  <span className="donate-num">{key + 1}</span>
                  <span>{t(`donations.interac.steps.${key}`)}</span>
                </li>
              ))}
            </ol>
            <p className="donate-mail t-stagger-line t-stagger-line--8">
              <span>{t('donations.interac.email')}</span>
              <a href={`mailto:${CHURCH_INTERAC_EMAIL}`}>{CHURCH_INTERAC_EMAIL}</a>
            </p>
            <p className="meta">{t('donations.interac.note')}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
