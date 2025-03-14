import React from 'react';
import { useTranslation } from 'react-i18next';

export function Schedule() {
  const { t } = useTranslation();

  const schedule = [
    { day: t('schedule.wednesday'), time: '18:45', languages: t('schedule.languages') },
    { day: t('schedule.sunday'), time: '10:00', languages: t('schedule.languages') },
    { day: t('schedule.sunday'), time: '16:45', languages: t('schedule.languages') },
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