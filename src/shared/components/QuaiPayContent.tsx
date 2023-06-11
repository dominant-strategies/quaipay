/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';
import { QuaiPayText } from './QuaiPayText';

interface QuaiPayContentProps {
  children: React.ReactNode;
  noInsetBottom?: boolean;
  title?: string | null;
}

export const QuaiPayContent: React.FC<QuaiPayContentProps> = ({
  children,
  noInsetBottom = false,
  title,
}) => {
  const insets = useSafeAreaInsets();
  const styles = useThemedStyle(themedStyle);

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: noInsetBottom ? 0 : insets.bottom,
        },
      ]}
    >
      {!!title && (
        <QuaiPayText type="H2" style={styles.title}>
          {title}
        </QuaiPayText>
      )}
      {children}
    </View>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 20,
    },
    title: {
      flex: 1,
      color: theme.primary,
    },
  });
