import React from 'react';
import { useTranslation } from 'react-i18next';

export function Presentacion()
{
  const { t } = useTranslation();

  return (
    <div className="presentacion-container">
      <div className="presentacion-content">
        <p className="mensaje">{t('presentation.message')}</p>
        <p className="pasaje">{t('presentation.verse')}</p>
        <p className="invitacion">{t('presentation.invitation')}</p>
      </div>
    </div>
  );
};