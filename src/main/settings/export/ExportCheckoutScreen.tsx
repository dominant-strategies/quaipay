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
  const { t } = useTranslation('translation', { keyPrefix: 'export.checkout' });
  const styles = useThemedStyle(themedStyle);

  const goToSeedPhraseScreen = () => navigation.navigate('ExportPhrase');
  const goToSettings = () =>
    RootNavigator.navigate('Main', { screen: 'Settings' });

  return (
    <QuaiPayContent>
      <View style={styles.container}>
        <QuaiPayText type="H1">{t('title')}</QuaiPayText>
        <View style={styles.separator} />
        <QuaiPayText type="paragraph" themeColor="secondary">
          {t('description')}
        </QuaiPayText>
        <View style={styles.separator} />
        <Pressable
          onPress={goToSeedPhraseScreen}
          style={({ pressed }) => [
            styles.button,
            styles.reviewButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="H3">{t('reviewSeedPhrase')}</QuaiPayText>
        </Pressable>
        <Pressable
          onPress={goToSettings}
          style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
        >
          <QuaiPayText type="H3" style={styles.whiteColor}>
            {t('complete')}
          </QuaiPayText>
        </Pressable>
      </View>
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    button: {
      marginBottom: 70,
      padding: 10,
      marginHorizontal: 12,
      backgroundColor: theme.normal,
      borderRadius: 8,
    },
    reviewButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.secondary,
      marginBottom: 16,
    },
    separator: {
      flex: 1,
    },
    whiteColor: {
      color: styledColors.white,
    },
  });
