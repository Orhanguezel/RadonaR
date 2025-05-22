// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enHome from './translations/en/home.json';
import enNavbar from './translations/en/navbar.json';
import deHome from './translations/de/home.json';
import deNavbar from './translations/de/navbar.json';

const resources = {
  en: {
    home: enHome,
    navbar: enNavbar,
  },
  de: {
    home: deHome,
    navbar: deNavbar,
  },
};
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    ns: ['home', 'navbar'],
    defaultNS: 'home',
  });

export default i18n;
