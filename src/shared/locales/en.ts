import { receive } from 'src/main/home/receive/strings';

import common_en from './en/common.json';
import error_en from './en/errors.json';
import home_en from './en/home.json';
import onboarding_en from './en/onboarding.json';
import receive_en from './en/receive.json';
import export_en from './en/export.json';
import wallet_en from './en/wallet.json';
import settings_en from './en/settings.json';

export const en = {
  translation: {
    common: common_en,
    error: error_en,
    home: {
      ...home_en,
      receive,
    },
    onboarding: onboarding_en,
    receive: receive_en,
    export: export_en,
    wallet: wallet_en,
    settings: settings_en,
  },
};
