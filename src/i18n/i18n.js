// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es',
    debug: true,
    detection: {
      order: ['queryString', 'cookie'],
      cache: ['cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en', 'es', 'fr'],
    load: 'languageOnly',
  })
  .then(() => {
    console.log('i18n initialized successfully');
  })
  .catch((err) => {
    console.error('Error initializing i18n:', err);
  });

export default i18n;