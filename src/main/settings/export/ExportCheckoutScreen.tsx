import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

import { ExportStackScreenProps } from './ExportStack';
import { RootNavigator } from 'src/shared/navigation/utils';
import { styledColors } from 'src/shared/styles';

export const ExportCheckoutScreen: React.FC<
  ExportStackScreenProps<'ExportCheckout'>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);

  const goToSeedPhraseScreen = () => navigation.navigate('ExportPhrase');
  const goToSettings = () =>
    RootNavigator.navigate('Main', { screen: 'Settings' });

  return (
    <QuaiPayContent>
      <View style={styles.textContainer}>
        <QuaiPayText type="H1">Never Share your Recovery Codes</QuaiPayText>
        <QuaiPayText type="H3">Description</QuaiPayText>
      </View>
      <View style={styles.separator} />
      <Pressable
        onPress={goToSeedPhraseScreen}
        style={({ pressed }) => [
          styles.button,
          styles.reviewButton,
          pressed && { opacity: 0.5 },
        ]}
      >
        <QuaiPayText style={styles.whiteColor}>Review Seed Phrase</QuaiPayText>
      </Pressable>
      <Pressable
        onPress={goToSettings}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
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
    button: {
      marginBottom: 70,
      padding: 10,
      marginHorizontal: 30,
      backgroundColor: theme.normal,
    },
    reviewButton: {
      marginBottom: 16,
    },
    separator: {
      flex: 1,
    },
    whiteColor: {
      color: styledColors.white,
    },
  });
