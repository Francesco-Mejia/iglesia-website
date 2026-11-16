import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import { Localized, textOf } from '../localized';

interface ServiceItem {
  title: Localized;
  date: Localized;
  banner: string;
}

function isWednesday(title: Localized): boolean {
  const raw = typeof title === 'string' ? title : `${title.fr ?? ''} ${title.es ?? ''}`;
  return /mercredi|miércoles/i.test(raw);
}

export function Schedule() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch('/data/events.json')
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <Reveal id="horarios" className="is-band">
      <div className="wrap">
        <h2 className="t-stagger-line t-stagger-line--1">{t('header.schedule')}</h2>
        <div className="service-grid reveal-photo">
          {services.map((service, index) => {
            const title = textOf(service.title, i18n.language);
            return (
              <article key={`${title}-${index}`} className="service-card">
                <h3>{title}</h3>
                <p className="service-time">{textOf(service.date, i18n.language)}</p>
                <p className="service-langs" aria-hidden={isWednesday(service.title) ? undefined : true}>
                  {isWednesday(service.title) ? t('schedule.languages') : '\u00a0'}
                </p>
                <div className="frame">
                  <img src={service.banner} alt="" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
