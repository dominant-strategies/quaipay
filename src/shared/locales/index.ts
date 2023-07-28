import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag } from 'react-native-localize';

import { en } from './en';
import { de } from './de';

const fallbackLng = findBestLanguageTag(['en', 'de'])?.languageTag;

i18n.use(initReactI18next).init({
  resources: {
    en,
    de,
  },
  fallbackLng: fallbackLng || 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});
