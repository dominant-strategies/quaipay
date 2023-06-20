import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { RootNavigator } from 'src/shared/navigation/utils';

import { ExportStackScreenProps } from './ExportStack';
import { useTranslation } from 'react-i18next';

export const ExportQRCodeScreen: React.FC<
  ExportStackScreenProps<'ExportQRCode'>
> = ({}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'export.qrCode' });
  const styles = useThemedStyle(themedStyle);

  const goToSettings = () =>
    RootNavigator.navigate('Main', { screen: 'Settings' });

  return (
    <QuaiPayContent>
      <View style={styles.separator} />
      <View style={styles.flexContainer}>
        <View style={styles.cardContainer}>
          <QuaiPayText type="H1">{t('title')}</QuaiPayText>
          <QuaiPayText type="paragraph" themeColor="secondary">
            {t('description')}
          </QuaiPayText>
        </View>
        <QuaiPayText style={styles.underline} themeColor="secondary">
          {t('learnMore')}
        </QuaiPayText>
      </View>
      <View style={styles.separator} />
      <Pressable
        onPress={goToSettings}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
      >
        <QuaiPayText type="H3">{t('complete')}</QuaiPayText>
      </Pressable>
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    flexContainer: {
      flex: 1,
    },
    cardContainer: {
      alignItems: 'center',
      marginHorizontal: 16,
      marginBottom: 20,
      padding: 32,
      gap: 4,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.border,
    },
    button: {
      marginBottom: 70,
      padding: 16,
      marginHorizontal: 30,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.border,
    },
    reviewButton: {
      marginBottom: 16,
    },
    separator: {
      flex: 1,
    },
    underline: {
      textDecorationLine: 'underline',
    },
  });
