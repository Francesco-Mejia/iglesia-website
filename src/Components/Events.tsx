import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import { Localized, textOf } from '../localized';

interface EventItem {
  title: Localized;
  date: Localized;
  description: Localized;
  banner: string;
}

export function Events() {
  const { t, i18n } = useTranslation();
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch('/data/events.json')
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  return (
    <Reveal id="eventos">
      <div className="wrap">
        <h2 className="t-stagger-line t-stagger-line--1">{t('events.title')}</h2>
        <div className="event-grid reveal-photo">
          {events.map((event, index) => {
            const title = textOf(event.title, i18n.language);
            return (
              <article key={`${title}-${index}`} className="event-card">
                <div className="frame">
                  <img src={event.banner} alt={title} />
                </div>
                <h3>{title}</h3>
                <p className="meta">{textOf(event.date, i18n.language)}</p>
                <p>{textOf(event.description, i18n.language)}</p>
              </article>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
