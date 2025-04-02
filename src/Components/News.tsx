import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

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
      <Container>
        <Row className="justify-content-center mb-4">
          <Col xs={12} className="text-center">
            <h2>{t('news.title')}</h2>
          </Col>
        </Row>
        <Row>
          {news.map((item, index) => (
            <Col key={item.title} xs={12} sm={6} md={4} className="mb-4">
              <div className="news-item h-100">
                {item.image && (
                  <img src={item.image} alt={item.title} className="news-image img-fluid mb-3" />
                )}
                <h3 className="h5">{item.title}</h3>
                <p className="news-date">{item.date}</p>
                <p>{item.content}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};