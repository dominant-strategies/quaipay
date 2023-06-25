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
import { Theme, Typography } from '../types';
import { styledColors } from '../styles';

type QuaiPayButtonType = 'default';

interface QuaiPayButtonStyle {
  backgroundColor: string;
  textColor: string;
  disabled: Omit<QuaiPayButtonStyle, 'disabled' | 'outlined'>;
  outlined: Omit<QuaiPayButtonStyle, 'outlined'>;
}

interface QuaiPayButtonProps extends Omit<PressableProps, 'style'> {
  outlined?: boolean;
  pill?: boolean;
  style?: StyleProp<ViewStyle>;
  title: string;
  type?: QuaiPayButtonType;
  titleType?: Typography;
}

export const QuaiPayButton: React.FC<QuaiPayButtonProps> = ({
  title,
  style,
  outlined = false, // Whether to use style as outline rather than background
  pill = false, // Whether to use pill shaped button (more rounded corners)
  type = 'default',
  titleType = 'H3',
  ...props
}) => {
  const { theme } = useTheme();
  const buttonStyles = buttonStylesByType[type](theme);
  const styles = stylesByType(buttonStyles, props.disabled ?? false);
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
        pill && styles.pill,
        outlined && styles.outlinedButton,
        pressed && styles.opacity50,
        style,
      ]}
    >
      <QuaiPayText
        type={titleType}
        style={[styles.text, outlined && styles.outlinedText]}
      >
        {title}
      </QuaiPayText>
    </Pressable>
  );
};

const stylesByType = (ref: QuaiPayButtonStyle, disabled?: boolean) =>
  StyleSheet.create({
    opacity50: {
      opacity: 0.5,
    },
    button: {
      padding: 16,
      borderRadius: 8,
      backgroundColor: disabled
        ? ref.disabled.backgroundColor
        : ref.backgroundColor,
    },
    pill: {
      borderRadius: 60,
    },
    text: {
      color: disabled ? ref.disabled.textColor : ref.textColor,
    },
    outlinedButton: {
      borderWidth: 1,
      borderColor: disabled
        ? ref.outlined.disabled.textColor
        : ref.outlined.textColor,
      backgroundColor: disabled
        ? ref.outlined.disabled.backgroundColor
        : ref.outlined.backgroundColor,
    },
    outlinedText: {
      color: disabled
        ? ref.outlined.disabled.textColor
        : ref.outlined.textColor,
    },
  });

const buttonStylesByType: Record<
  QuaiPayButtonType,
  (theme: Theme) => QuaiPayButtonStyle
> = {
  default: (theme: Theme) => ({
    backgroundColor: theme.normal,
    textColor: styledColors.white,
    disabled: {
      backgroundColor: styledColors.lightGray,
      textColor: styledColors.gray,
    },
    outlined: {
      disabled: {
        backgroundColor: 'transparent',
        textColor: styledColors.gray,
      },
      backgroundColor: 'transparent',
      textColor: theme.normal,
    },
  }),
};
