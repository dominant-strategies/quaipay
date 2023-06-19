import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

import { ExportStackScreenProps } from './ExportStack';
import { styledColors } from 'src/shared/styles';

export const ExportConfirmationPhraseScreen: React.FC<
  ExportStackScreenProps<'ExportConfirmationPhrase'>
> = ({
  navigation,
  route: {
    params: { seedPhrase },
  },
}) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);

  const goToCheckout = () => navigation.navigate('ExportCheckout');

  const seedPhraseWords = seedPhrase.split(' ');
  return (
    <QuaiPayContent>
      <View style={styles.textContainer}>
        <QuaiPayText type="H1">{t('export.confirmation.title')}</QuaiPayText>
        <QuaiPayText type="H3">
          {t('export.confirmation.description')}
        </QuaiPayText>
      </View>
      <View style={styles.wordFillerContainer}>
        {seedPhraseWords.map((_, idx) => (
          <View key={idx} style={styles.itemContainer}>
            <View style={styles.word} />
          </View>
        ))}
        {seedPhraseWords.map((word, idx) => (
          <View key={idx} style={styles.itemContainer}>
            <QuaiPayText style={styles.word}>{word}</QuaiPayText>
          </View>
        ))}
      </View>
      <View style={styles.separator} />
      <Pressable
        onPress={goToCheckout}
        style={({ pressed }) => [
          styles.continueButton,
          pressed && { opacity: 0.5 },
        ]}
      >
        <QuaiPayText style={styles.whiteColor}>
          {t('common.continue')}
        </QuaiPayText>
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
    },
    wordFillerContainer: {
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
    continueButton: {
      marginBottom: 70,
      padding: 10,
      marginHorizontal: 30,
      backgroundColor: theme.normal,
    },
    separator: {
      flex: 1,
    },
    whiteColor: {
      color: styledColors.white,
    },
  });
