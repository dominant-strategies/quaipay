import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { useTheme } from '../context/themeContext';
import { ThemeColor, Typography } from '../types';
import { typography } from '../styles';

interface IQuaiPayTextProps extends TextProps {
  themeColor?: keyof ThemeColor;
  type?: Typography;
  underline?: boolean;
}

export const QuaiPayText: React.FC<IQuaiPayTextProps> = ({
  children,
  themeColor = 'primary',
  type = 'default',
  underline = false,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const fontStyle = typography[type];

  return (
    <Text
      style={[
        fontStyle,
        { color: theme[themeColor] },
        underline && styles.underline,
        style,
      ]}
      allowFontScaling={false}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  underline: {
    textDecorationLine: 'underline',
  },
});
