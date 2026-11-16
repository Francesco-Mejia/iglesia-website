import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from '../Components/Reveal';

type TopicKey = 'mision' | 'vision' | 'valores';

export function AboutUsPage() {
  const { t } = useTranslation();
  const copyRef = useRef<HTMLDivElement>(null);

  const topics: { [key in TopicKey]: { title: string; text: string; icon: string } } = {
    mision: {
      title: t('about.mission.title'),
      text: t('about.mission.text'),
      icon: '/images/bible-icon.png',
    },
    vision: {
      title: t('about.vision.title'),
      text: t('about.vision.text'),
      icon: '/images/VISION2.png',
    },
    valores: {
      title: t('about.values.title'),
      text: t('about.values.text'),
      icon: '/images/values2-icon.png',
    },
  };

  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;
    el.classList.remove('is-shown');
    void el.offsetHeight;
    el.classList.add('is-shown');
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="hero-media">
          <img
            className="hero-photo"
            src="/images/culto8.jpg"
            alt={t('media.community')}
          />
          <div className="hero-scrim" />
        </div>
        <div className="wrap">
          <div className="t-stagger" ref={copyRef}>
            <h1 className="t-stagger-line t-stagger-line--1">{t('about.title')}</h1>
          </div>
        </div>
      </section>
      <Reveal>
        <div className="wrap about-grid">
          {Object.entries(topics).map(([key, topic], index) => (
            <article key={key}>
              <img className="about-icon" src={topic.icon} alt="" />
              <h2 className={`t-stagger-line t-stagger-line--${index + 1}`}>{topic.title}</h2>
              <p>{topic.text}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </>
  );
}
