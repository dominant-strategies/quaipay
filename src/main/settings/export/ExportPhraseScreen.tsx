import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import BaselineError from 'src/shared/assets/baselineError.svg';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

import { ExportStackScreenProps } from './ExportStack';

export const ExportPhraseScreen: React.FC<
  ExportStackScreenProps<'ExportPhrase'>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);

  const goToConfirmPhrase = () =>
    navigation.navigate('ExportConfirmationPhrase');

  return (
    <QuaiPayContent>
      <View style={styles.textContainer}>
        <QuaiPayText type="H1" style={styles.title}>
          Write down your Seed Phrase
        </QuaiPayText>
        <QuaiPayText type="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Se
        </QuaiPayText>
      </View>
      <View style={styles.disclaimerContainer}>
        <BaselineError />
        <QuaiPayText>
          Screenshots are disabled to ensure protection of your recovery phrase
        </QuaiPayText>
      </View>
      <View style={styles.separator} />
      <Pressable
        onPress={goToConfirmPhrase}
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
      alignItems: 'center',
      marginHorizontal: 48,
    },
    disclaimerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surfaceVariant,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginVertical: 16,
      marginHorizontal: 58,
      borderWidth: 1,
      borderColor: theme.normal,
      borderRadius: 4,
      gap: 4,
    },
    title: {
      marginBottom: 8,
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
