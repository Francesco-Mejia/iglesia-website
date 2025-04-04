import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';

interface Event 
{
  title: string;
  date: string;
  description: string;
  banner: string;
}

export function Events ()
{
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) 
    {
      setEvents(JSON.parse(storedEvents));
    } 
    else 
    {
      fetch('/data/events.json')
        .then(res => res.json())
        .then(data => setEvents(data));
    }
  }, []);

  const handleEventUpdate = (index: number, updatedEvent: Event) => {
    const newEvents = [...events];
    newEvents[index] = updatedEvent;
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="events-container" id='eventos'>
      <Container>
        
        <Row>
          <Col xs={12}>
            <div className="events-slider-container">
              <Slider {...settings}>
                {events.map((event, index) => (
                  <div key={event.title} className="event-item">
                    <img src={event.banner} alt={event.title} className="event-banner img-fluid" />
                    <div className="event-details">
                      <h3>{event.title}</h3>
                      <p className="event-date">{event.date}</p>
                      <p className="event-description">{event.description}</p>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};