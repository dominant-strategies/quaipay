import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { findBestLanguageTag } from 'react-native-localize';

import common_en from './en/common.json';
import common_de from './de/common.json';
import error_en from './en/errors.json';
import error_de from './de/errors.json';
import home_en from './en/home.json';
import home_de from './de/home.json';
import onboarding_en from './en/onboarding.json';
import onboarding_de from './de/onboarding.json';
import receive_en from './en/receive.json';
import receive_de from './de/receive.json';
import export_en from './en/export.json';
import export_de from './de/export.json';
import wallet_en from './en/wallet.json';
import wallet_de from './de/wallet.json';
import settings_en from './en/settings.json';
import settings_de from './de/settings.json';

const fallbackLng = findBestLanguageTag(['en', 'de'])?.languageTag;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        common: common_en,
        error: error_en,
        home: home_en,
        onboarding: onboarding_en,
        receive: receive_en,
        export: export_en,
        wallet: wallet_en,
        settings: settings_en,
      },
    },
    de: {
      translation: {
        common: common_de,
        error: error_de,
        home: home_de,
        onboarding: onboarding_de,
        receive: receive_de,
        export: export_de,
        wallet: wallet_de,
        settings: settings_de,
      },
    },
  },
  fallbackLng: fallbackLng || 'en',
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: 'v3',
});
