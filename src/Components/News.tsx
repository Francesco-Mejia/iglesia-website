import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';
import { Localized, textOf } from '../localized';

interface NewsItem {
  title: Localized;
  date: Localized;
  content?: Localized;
  image?: string;
}

export function News() {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('/data/news.json')
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  return (
    <Reveal id="noticias" className="is-band">
      <div className="wrap">
        <h2 className="t-stagger-line t-stagger-line--1">{t('news.title')}</h2>
        <div className="reveal-photo">
          {news.map((item, index) => {
            const title = textOf(item.title, i18n.language);
            const content = textOf(item.content, i18n.language);
            return (
              <article key={`${title}-${index}`} className="news-feature news-card">
                {item.image && (
                  <div className="frame">
                    <img src={item.image} alt={title} />
                  </div>
                )}
                <div>
                  <h3>{title}</h3>
                  <p className="meta">{textOf(item.date, i18n.language)}</p>
                  {content ? <p>{content}</p> : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
