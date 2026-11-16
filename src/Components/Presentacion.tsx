import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export function Presentacion() {
  const { t } = useTranslation();
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    el.classList.remove('is-hiding');
    el.classList.remove('is-shown');
    void el.offsetHeight;
    el.classList.add('is-shown');
  }, []);

  return (
    <section className="hero" id="accueil">
      <div className="hero-media">
        <img
          className="hero-photo"
          src="/images/hero-bible.jpg"
          alt={t('media.bible')}
        />
        <div className="hero-scrim" />
      </div>
      <div className="wrap">
        <div className="t-stagger hero-copy" ref={copyRef}>
          <p className="kicker t-stagger-line t-stagger-line--1">{t('title')}</p>
          <h1 className="t-stagger-line t-stagger-line--2">{t('presentation.message')}</h1>
          <p className="verse t-stagger-line t-stagger-line--3">{t('presentation.verse')}</p>
          {/* <p className="invite t-stagger-line t-stagger-line--4">{t('presentation.invitation')}</p> */}
        </div>
      </div>
    </section>
  );
}
