import { ThemeType, Theme } from 'src/shared/types/Theme';

import { styledColors } from '..';

export const LightTheme: Theme = {
  type: ThemeType.LIGHT,
  normal: styledColors.normal,
  primary: styledColors.black,
  secondary: styledColors.gray,
  background: styledColors.light,
  surfaceVariant: styledColors.light,
  surface: styledColors.white,
  border: styledColors.border,
  alert: styledColors.alert,
};
