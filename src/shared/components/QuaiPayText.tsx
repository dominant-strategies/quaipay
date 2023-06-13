import React from 'react';
import { Text, TextProps } from 'react-native';

import { useTheme } from '../context/themeContext';
import { ThemeColor, Typography } from '../types';
import { typography } from '../styles';

interface IQuaiPayTextProps extends TextProps {
  themeColor?: keyof ThemeColor;
  type?: Typography;
}

export const QuaiPayText: React.FC<IQuaiPayTextProps> = ({
  children,
  themeColor = 'primary',
  type = 'default',
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const fontStyle = typography[type];

  return (
    <Text
      style={[fontStyle, { color: theme[themeColor] }, style]}
      allowFontScaling={false}
      {...props}
    >
      {children}
    </Text>
  );
};
