import React from 'react';
import { useTranslation } from 'react-i18next';
import { Reveal } from './Reveal';

export function Contact() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: '/images/email-icon.png',
      alt: 'Email',
      href: 'mailto:scristosalva@hotmail.fr',
      external: false,
    },
    {
      icon: '/images/youtube-icon.png',
      alt: 'YouTube',
      href: 'https://www.youtube.com/@HectorLuisVente/featured',
      external: true,
    },
    {
      icon: 'facebook',
      alt: 'Facebook',
      href: 'https://www.facebook.com/egliselerestedesagrace/?locale=es_LA',
      external: true,
    },
    {
      icon: '/images/IG-LOGO.png',
      alt: 'Instagram',
      href: 'https://www.instagram.com/egliselerestedesagrace?igsh=NmJ3NjN4bTQ3czBn&utm_source=qr',
      external: true,
    },
  ];

  return (
    <Reveal id="contacto">
      <div className="wrap">
        <h2 className="t-stagger-line t-stagger-line--1">{t('contact.title')}</h2>
        <div className="contact-row reveal-photo">
          {socialLinks.map((link) => (
            <a
              key={link.alt}
              className="contact-link lift"
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.icon === 'facebook' ? (
                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M15.1 8.5V6.7c0-.8.2-1.2 1.3-1.2H18V3h-2.2C13.1 3 11.5 4.5 11.5 7v1.5H9.2v2.7h2.3V21h3.1v-9.8h2.6l.4-2.7h-3z"
                  />
                </svg>
              ) : (
                <img src={link.icon} alt="" />
              )}
              <span>{link.alt}</span>
            </a>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
