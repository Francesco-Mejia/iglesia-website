import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

const LAT = 46.80464968967547;
const LNG = -71.2418548055773;

export function Map() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const map = new maplibregl.Map({
      container,
      style: 'https://tiles.openfreemap.org/styles/positron',
      center: [LNG, LAT],
      zoom: 15,
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
    });

    const popup = new maplibregl.Popup({ offset: 28, className: 'church-popup' }).setHTML(
      '<strong>Eglise Le Reste De Sa Grace</strong><br />Iglesia El Remanente de Su Gracia'
    );

    const marker = new maplibregl.Marker({ color: '#161616' })
      .setLngLat([LNG, LAT])
      .setPopup(popup)
      .addTo(map);

    const resize = () => map.resize();
    map.on('load', resize);

    return () => {
      marker.remove();
      map.remove();
    };
  }, []);

  return (
    <Reveal id="ubicacion">
      <div className="wrap">
        <h2 className="t-stagger-line t-stagger-line--1">{t('header.location')}</h2>
        <div className="map-layout">
          <div>
            <p className="place-street t-stagger-line t-stagger-line--2">{t('map.street')}</p>
            <p className="place-detail">{t('map.detail')}</p>
            <a
              className="directions"
              href="https://www.google.com/maps/dir/?api=1&destination=766%20Rue%20Kirouac%2C%20suite%20201%2C%20Quebec%2C%20QC"
              target="_blank"
              rel="noreferrer"
            >
              {t('map.directions')}
            </a>
          </div>
          <div className="reveal-photo reveal-photo--plain">
            <div className="map-frame" ref={containerRef} />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
