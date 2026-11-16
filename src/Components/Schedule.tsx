import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import { Localized, textOf } from '../localized';

interface ServiceItem {
  title: Localized;
  date: Localized;
  description?: Localized;
  banner: string;
}

function isWednesday(title: Localized): boolean {
  const raw = typeof title === 'string' ? title : `${title.fr ?? ''} ${title.es ?? ''}`;
  return /mercredi|miércoles|français et en espagnol|francés y en español/i.test(raw);
}

export function Schedule() {
  const { t, i18n } = useTranslation();
  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    fetch('/data/events.json')
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const sunday = services.filter((service) => !isWednesday(service.title));
  const wednesday = services.filter((service) => isWednesday(service.title));
  const groups = [sunday, wednesday].filter((group) => group.length > 0);
  let step = 2;

  return (
    <Reveal id="horarios" className="is-band">
      <div className="wrap">
        <h2 className="t-stagger-line t-stagger-line--1">{t('header.schedule')}</h2>
        <div className="day-list">
          {groups.map((group) => {
            const dayStep = step;
            step += 1;
            const day = textOf(group[0].description, i18n.language);
            return (
              <section key={day} className="day-block">
                <h3 className={`service-day t-stagger-line t-stagger-line--${dayStep}`}>{day}</h3>
                <div className="service-rows">
                  {group.map((service) => {
                    const rowStep = step;
                    step += 1;
                    const title = textOf(service.title, i18n.language);
                    return (
                      <article key={title} className={`service-row t-stagger-line t-stagger-line--${rowStep}`}>
                        <div className="frame">
                          <img src={service.banner} alt="" />
                        </div>
                        <p className="service-time">{textOf(service.date, i18n.language)}</p>
                        <p className="service-name">{title}</p>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
