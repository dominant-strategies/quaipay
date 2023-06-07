import { ThemeType, Theme } from './types';
import { styledColors } from '..';

export const DarkTheme: Theme = {
  type: ThemeType.DARK,
  normal: styledColors.normal,
  primary: styledColors.white,
  secondary: styledColors.gray,
  background: styledColors.black,
  surfaceVariant: styledColors.darkGray,
  surface: styledColors.dark,
  border: styledColors.darkGray,
};
