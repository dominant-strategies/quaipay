export enum ThemeType {
  DARK = 'dark',
  LIGHT = 'light',
}

/**
 * Theming interface
 *
 * normal - Brand color.
 * primary - Primary color for elements in the app.
 * secondary - Secondary color for the app which complements the primary color.
 * [key]Variant - variant color of a main color level (Primary, Secondary, Surface, etc)
 * background - background color for pages, such as lists.
 * surface - background color for elements containing content, such as cards.
 * border - border color for surface elements
 */
export interface Theme extends ThemeColor {
  type: ThemeType;
}

export interface ThemeColor {
  normal: string;
  primary: string;
  secondary: string;
  surface: string;
  surfaceVariant: string;
  background: string;
  border: string;
  alert: string;
}
