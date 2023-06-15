import React from 'react';
import { Text, TextProps } from 'react-native';

import { useTheme } from '../context/themeContext';
import { Typography } from '../types';
import { typography } from '../styles';

interface IQuaiPayTextProps extends TextProps {
  type?: Typography;
  themeColor?: 'primary' | 'secondary';
}

export const QuaiPayText: React.FC<IQuaiPayTextProps> = ({
  children,
  style,
  type = 'default',
  themeColor = 'primary',
  ...props
}) => {
  const { theme } = useTheme();
  const fontStyle = typography[type];

  return (
    <Text
      style={[
        fontStyle,
        {
          color: theme[themeColor],
        },
        style,
      ]}
      allowFontScaling={false}
      {...props}
    >
      {children}
    </Text>
  );
};
