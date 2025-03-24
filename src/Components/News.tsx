import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface NewsItem 
{
    title: string;
    date: string;
    content: string;
    image?: string;
  }

export function News()
{
  const { t } = useTranslation();
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const storedNews = localStorage.getItem('news');
    if (storedNews) {
      setNews(JSON.parse(storedNews));
    } else {
      fetch('/data/news.json')
        .then(res => res.json())
        .then(data => setNews(data));
    }
  }, []);

  return (
    <div id='noticias' className="news-container">
      <h2>{t('news.title')}</h2>
      <div className="news-grid">
        {news.map((item, index) => (
          <div key={item.title} className="news-item">
            {item.image && (
              <img src={item.image} alt={item.title} className="news-image" />
            )}
            <h3>{item.title}</h3>
            <p className="news-date">{item.date}</p>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};