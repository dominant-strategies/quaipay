import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Theme } from '../types';
import { QuaiPayText } from './QuaiPayText';

interface QuaiPaySeedPhraseLayoutDisplayProps {
  children: React.ReactNode[];
  showIndex?: boolean;
}

export const QuaiPaySeedPhraseLayoutDisplay: React.FC<
  QuaiPaySeedPhraseLayoutDisplayProps
> = ({ children, showIndex = false }) => {
  return (
    <View style={styles.container}>
      {children.map((item, idx) => (
        <View key={idx} style={styles.itemContainer}>
          {showIndex && <QuaiPayText>{idx + 1}.</QuaiPayText>}
          {item}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    gap: 8,
    marginHorizontal: 16,
    paddingRight: 16,
  },
  itemContainer: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2,
  },
});

export const seedPhraseLayoutDisplayWordThemedStyle = (theme: Theme) =>
  StyleSheet.create({
    word: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: theme.border,
      paddingTop: 10,
      paddingHorizontal: 8,
      width: 85,
      height: 40,
      textAlign: 'left',
    },
  });
