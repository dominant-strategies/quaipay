import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

import { ExportStackScreenProps } from './ExportStack';

export const ExportPhraseScreen: React.FC<
  ExportStackScreenProps<'ExportPhrase'>
> = ({}) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);

  return (
    <QuaiPayContent>
      <View style={styles.textContainer}>
        <QuaiPayText type="H1">Write down your Seed Phrase</QuaiPayText>
        <QuaiPayText type="H3">Description</QuaiPayText>
      </View>
      <View style={styles.separator} />
      <Pressable
        style={({ pressed }) => [
          styles.continueButton,
          pressed && { opacity: 0.5 },
        ]}
      >
        <QuaiPayText>{t('common.continue')}</QuaiPayText>
      </Pressable>
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    textContainer: {
      flex: 1,
      alignItems: 'center',
      marginBottom: 20,
      marginHorizontal: 20,
    },
    continueButton: {
      marginBottom: 70,
      padding: 10,
      marginHorizontal: 30,
      backgroundColor: theme.normal,
    },
    separator: {
      flex: 1,
    },
  });
