import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import home_en from './en/home.json';
import home_de from './de/home.json';
import onboarding_en from './en/onboarding.json';
import onboarding_de from './de/onboarding.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: home_en,
        onboarding: onboarding_en,
      },
    },
    de: {
      translation: {
        home: home_de,
        onboarding: onboarding_de,
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});
