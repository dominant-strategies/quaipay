import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemedStyle } from '../hooks/useThemedStyle';
import { Theme } from '../types';

interface QuaiPayContentProps {
  children: React.ReactNode;
}

export const QuaiPayContent: React.FC<QuaiPayContentProps> = ({ children }) => {
  const styles = useThemedStyle(themedStyle);

  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
