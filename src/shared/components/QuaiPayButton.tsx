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
  disabledBackgroundColor: string;
  disabledTextColor: string;
}

interface QuaiPayButtonProps extends Omit<PressableProps, 'style'> {
  pill?: boolean;
  style?: StyleProp<ViewStyle>;
  title: string;
  type?: QuaiPayButtonType;
  titleType?: Typography;
}

export const QuaiPayButton: React.FC<QuaiPayButtonProps> = ({
  title,
  style,
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
        pressed && styles.opacity50,
        style,
      ]}
    >
      <QuaiPayText type={titleType} style={styles.text}>
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
        ? ref.disabledBackgroundColor
        : ref.backgroundColor,
    },
    pill: {
      borderRadius: 60,
    },
    text: {
      color: disabled ? ref.disabledTextColor : ref.textColor,
    },
  });

const buttonStylesByType: Record<
  QuaiPayButtonType,
  (theme: Theme) => QuaiPayButtonStyle
> = {
  default: (theme: Theme) => ({
    backgroundColor: theme.normal,
    textColor: styledColors.white,
    disabledBackgroundColor: styledColors.lightGray,
    disabledTextColor: styledColors.gray,
  }),
};
