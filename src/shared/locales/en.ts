import { receive } from 'src/main/home/receive/strings';
import { send } from 'src/main/home/send/strings';

import common_en from './en/common.json';
import error_en from './en/errors.json';
import onboarding_en from './en/onboarding.json';
import export_en from './en/export.json';
import wallet_en from './en/wallet.json';
import settings_en from './en/settings.json';

export const en = {
  translation: {
    common: common_en,
    error: error_en,
    home: {
      receive,
      send,
    },
    onboarding: onboarding_en,
    export: export_en,
    wallet: wallet_en,
    settings: settings_en,
  },
};
