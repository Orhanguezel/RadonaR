// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import common_en from './translations/en/common.json';
import home_en from './translations/en/home.json';
import common_de from './translations/de/common.json';
import home_de from './translations/de/home.json';

const resources = {
  en: {
    common: common_en,
    home: home_en,
  },
  de: {
    common: common_de,
    home: home_de,
  },
};

i18n
  .use(LanguageDetector) // Wykrywa język użytkownika
  .use(initReactI18next) // Inicjalizuje i18next dla Reacta
  .init({
    resources,
    fallbackLng: 'en', // Użyj angielskiego, jeśli wykryty język nie jest dostępny
    debug: true, // Ustaw na true tylko podczas dewelopmentu, aby widzieć logi i18next w konsoli
    interpolation: {
      escapeValue: false, // React sam chroni przed XSS
    },
    ns: ['common', 'home'], // Definiuje dostępne przestrzenie nazw
    defaultNS: 'common',   // Domyślna przestrzeń nazw
    detection: { // Opcjonalna, ale zalecana konfiguracja dla LanguageDetector
      order: ['localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'], // Gdzie zapamiętywać wybrany język
    },
  });

export default i18n;