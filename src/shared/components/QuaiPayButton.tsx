import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { QuaiPayText } from './QuaiPayText';

import { Colors, Theme, Typography } from '../types';
import { styledColors } from '../styles';
import { useThemedStyle } from '../hooks';

type QuaiPayButtonType = 'default' | 'secondary';

interface QuaiPayButtonStyle {
  backgroundColor: string;
  textColor: string;
  disabled: Omit<QuaiPayButtonStyle, 'disabled' | 'outlined'>;
  outlined: Omit<QuaiPayButtonStyle, 'outlined'>;
}

interface QuaiPayButtonProps extends Omit<PressableProps, 'style'> {
  /*
   * Color to use for button's background instead of the one on typed style
   */
  bgColor?: Colors;
  /*
   * Whether to use style as outline rather than background, which mainly adds border to it
   */
  outlined?: boolean;
  /*
   * Whether to use pill shaped button (more rounded corners)
   */
  pill?: boolean;
  /*
   * SVG icon to be rendered alongside the title
   */
  RightIcon?: React.FC<React.SVGAttributes<SVGElement>>;
  /*
   * Custom style props to overwrite any style that is applied to button's component
   */
  style?: StyleProp<ViewStyle>;
  /*
   * Text string to use as title for the button
   */
  title: string;
  /*
   * Type of styling of the component to be used
   */
  type?: QuaiPayButtonType;
  /*
   * Color to use for title's color instead of the one on typed style
   */
  titleColor?: Colors;
  /*
   * Typography to be used on title's component instead of the one on typed style
   */
  titleType?: Typography;
}

export const QuaiPayButton: React.FC<QuaiPayButtonProps> = ({
  title,
  bgColor,
  titleColor,
  RightIcon,
  style,
  outlined = false,
  pill = false,
  type = 'default',
  titleType = 'H3',
  ...props
}) => {
  const buttonStyles = useThemedStyle(t =>
    buttonStylesByType[type](t, titleColor),
  );
  const styles = stylesByType(buttonStyles, props.disabled ?? false);
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [
        styles.button,
          RightIcon && styles.row,
        pill && styles.pill,
        outlined && styles.outlinedButton,
        bgColor && { backgroundColor: bgColor },
        pressed && styles.opacity50,
        style,
      ]}
    >
      <QuaiPayText
        type={titleType}
        style={[
          styles.text,
          outlined && styles.outlinedText,
          titleColor && { color: titleColor },
        ]}
      >
        {title}
      </QuaiPayText>
        {RightIcon && <RightIcon />}
    </Pressable>
  );
};

const stylesByType = (ref: QuaiPayButtonStyle, disabled?: boolean) =>
  StyleSheet.create({
    opacity50: {
      opacity: 0.5,
    },
    button: {
      gap: 8,
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
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

const buttonStylesByType: Record<
  QuaiPayButtonType,
  (theme: Theme, color?: Colors) => QuaiPayButtonStyle
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
  secondary: (theme: Theme, color?: Colors) => ({
    backgroundColor: 'transparent',
    textColor: color ? color : theme.primary,
    disabled: {
      backgroundColor: 'transparent',
      textColor: theme.border,
    },
    outlined: {
      backgroundColor: 'transparent',
      textColor: color ? color : theme.primary,
      disabled: {
        backgroundColor: 'transparent',
        textColor: theme.border,
      },
    },
  }),
};
