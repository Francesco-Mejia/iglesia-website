import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NAV = [
  { href: '/#horarios', key: 'header.schedule' },
  { href: '/#ubicacion', key: 'header.location' },
  { href: '/#transmisiones', key: 'header.livestream' },
  { href: '/#donaciones', key: 'header.donations' },
  { href: '/gallery', key: 'header.gallery' },
  { href: '/about', key: 'header.about' },
] as const;

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const spanish = i18n.language.startsWith('es');

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }
    const el = document.getElementById(location.hash.slice(1));
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }, [location]);

  const menuLabel = open
    ? (spanish ? 'Cerrar' : 'Fermer')
    : (spanish ? 'Menú' : 'Menu');

  return (
    <header className={`site-header${solid || open ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo-link" onClick={() => setOpen(false)}>
          <img src="/images/logo_iglesia.jpg" alt={t('title')} className="header-logo" />
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {menuLabel}
        </button>
        <nav id="site-nav" className="nav">
          {NAV.map((item) => (
            <Link key={item.href} to={item.href} onClick={() => setOpen(false)}>
              {t(item.key)}
            </Link>
          ))}
          <div className="lang-toggle" role="group" aria-label={spanish ? 'Idioma' : 'Langue'}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path
                d="M3 12h18M12 3c2.4 2.7 3.6 5.7 3.6 9s-1.2 6.3-3.6 9c-2.4-2.7-3.6-5.7-3.6-9s1.2-6.3 3.6-9z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
            <button
              type="button"
              aria-pressed={!spanish}
              onClick={() => i18n.changeLanguage('fr')}
            >
              FR
            </button>
            <button
              type="button"
              aria-pressed={spanish}
              onClick={() => i18n.changeLanguage('es')}
            >
              ES
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
