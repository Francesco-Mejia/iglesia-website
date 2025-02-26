import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';

interface Event 
{
  title: string;
  date: string;
  description: string;
  banner: string;
}

export function Events ()
{
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    } else {
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
    slidesToShow: 3, // Ajusta este valor según tus necesidades
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000, // Ajusta este valor según tu preferencia
  };

  return (
    <div className="events-container" id='eventos'>
      <h2>Próximos eventos</h2>
      <Slider {...settings}>
        {events.map((event, index) => (
          <div key={event.title}>
            <h3>{event.title}</h3>
            <img src={event.banner} alt={event.title} />
            <p>{event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};