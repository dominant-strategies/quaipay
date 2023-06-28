import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  QuaiPayContent,
  QuaiPayQRCode,
  QuaiPayText,
} from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useEntropy, useThemedStyle } from 'src/shared/hooks';
import { RootNavigator } from 'src/shared/navigation/utils';

import { ExportStackScreenProps } from './ExportStack';

export const ExportQRCodeScreen: React.FC<
  ExportStackScreenProps<'ExportQRCode'>
> = ({}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'export.qrCode' });
  const styles = useThemedStyle(themedStyle);
  const entropy = useEntropy();

  const goToSettings = () =>
    RootNavigator.navigate('Main', { screen: 'Settings' });

  return (
    <QuaiPayContent>
      <View style={styles.separator} />
      <View style={styles.cardContainer}>
        <QuaiPayText type="H1">{t('title')}</QuaiPayText>
        <QuaiPayText type="paragraph" themeColor="secondary">
          {t('description')}
        </QuaiPayText>
        {entropy ? (
          <QuaiPayQRCode
            containerStyle={styles.qrCodeContainer}
            value={entropy}
          />
        ) : (
          <ActivityIndicator color={styles.loader.color} />
        )}
      </View>
      <QuaiPayText style={styles.underline} themeColor="secondary">
        {t('learnMore')}
      </QuaiPayText>
      <View style={styles.separator} />
      <Pressable
        onPress={goToSettings}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
      >
        <QuaiPayText type="H3">{t('complete')}</QuaiPayText>
      </Pressable>
      <View style={styles.separator} />
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
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
      padding: 16,
      marginHorizontal: 30,
      backgroundColor: theme.surface,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: theme.border,
    },
    qrCodeContainer: {
      marginTop: 20,
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
    loader: {
      color: theme.secondary,
    },
  });
