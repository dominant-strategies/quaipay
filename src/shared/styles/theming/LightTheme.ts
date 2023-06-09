import { ThemeType, Theme } from '../../types/Theme';
import { styledColors } from '..';

export const LightTheme: Theme = {
  type: ThemeType.LIGHT,
  normal: styledColors.normal,
  primary: styledColors.black,
  secondary: styledColors.gray,
  background: styledColors.lightGray,
  surfaceVariant: styledColors.light,
  surface: styledColors.white,
  border: styledColors.border,
};