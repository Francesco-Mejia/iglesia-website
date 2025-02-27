import React from 'react';

export function Schedule() {
  const schedule = [
    { day: 'Miércoles', time: '18:45', languages: 'Francés | Español' },
    { day: 'Domingo (culto devocional)', time: '10:00', languages: 'Francés | Español' },
    { day: 'Domingo (culto devocional)', time: '16:45', languages: 'Francés | Español' },
  ];

  return (
    <div id='horarios' className="schedule-container">
      <div className="schedule-table">
        {schedule.map((item, index) => (
          <div key={index} className="schedule-row">
            <div className="schedule-cell">{item.day}</div>
            <div className="schedule-cell">{item.time}</div>
            <div className="schedule-cell">{item.languages}</div>
          </div>
        ))}
      </div>
    </div>
  );
}