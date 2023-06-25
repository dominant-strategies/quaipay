import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { QuaiPayText } from './QuaiPayText';

import { useTheme } from '../context/themeContext';
import { Theme } from '../types';
import { styledColors } from '../styles';

type QuaiPayButtonType = 'default';

interface QuaiPayButtonStyle {
  backgroundColor: string;
  textColor: string;
}

interface QuaiPayButtonProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  title: string;
  type?: QuaiPayButtonType;
}

export const QuaiPayButton: React.FC<QuaiPayButtonProps> = ({
  title,
  style,
  type = 'default',
  ...props
}) => {
  const { theme } = useTheme();
  const buttonStyles = buttonStylesByType[type](theme);
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        {
          backgroundColor: buttonStyles.backgroundColor,
        },
        pressed && styles.opacity50,
        style,
      ]}
    >
      <QuaiPayText style={{ color: buttonStyles.textColor }}>
        {title}
      </QuaiPayText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  opacity50: {
    opacity: 0.5,
  },
});

const buttonStylesByType: Record<
  QuaiPayButtonType,
  (theme: Theme) => QuaiPayButtonStyle
> = {
  default: (theme: Theme) => ({
    backgroundColor: theme.normal,
    textColor: styledColors.white,
  }),
};
