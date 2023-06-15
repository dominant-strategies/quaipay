import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag } from 'react-native-localize';

import common_en from './en/common.json';
import common_de from './de/common.json';
import home_en from './en/home.json';
import home_de from './de/home.json';
import onboarding_en from './en/onboarding.json';
import onboarding_de from './de/onboarding.json';
import receive_en from './en/receive.json';
import receive_de from './de/receive.json';
import export_en from './en/export.json';
import export_de from './de/export.json';

const fallbackLng = findBestLanguageTag(['en', 'de'])?.languageTag;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        common: common_en,
        home: home_en,
        onboarding: onboarding_en,
        receive: receive_en,
        export: export_en,
      },
    },
    de: {
      translation: {
        common: common_de,
        home: home_de,
        onboarding: onboarding_de,
        receive: receive_de,
        export: export_de,
      },
    },
  },
  fallbackLng: fallbackLng || 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});
