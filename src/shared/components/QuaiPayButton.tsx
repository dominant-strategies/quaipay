import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface QuaiPayButtonProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  title: string;
}

export const QuaiPayButton: React.FC<QuaiPayButtonProps> = ({
  title,
  style,
  ...props
}) => {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [pressed && styles.opacity50, style]}
    >
      {title}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  opacity50: {
    opacity: 0.5,
  },
});
