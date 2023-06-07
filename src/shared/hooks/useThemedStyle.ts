import { useMemo } from 'react';

import { Theme } from '../types/Theme';
import { useTheme } from '../context/themeContext';

type ThemeAwareStyleGenerator<T extends {}> = (theme: Theme) => T;

export const useThemedStyle = <T extends {}>(
  fn: ThemeAwareStyleGenerator<T>,
) => {
  const { theme } = useTheme();

  const ThemedStyle = useMemo(() => fn(theme), [fn, theme]);
  return ThemedStyle;
};
