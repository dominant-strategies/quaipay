import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { RootNavigator } from 'src/shared/navigation/utils';

import { ExportStackScreenProps } from './ExportStack';

export const ExportQRCodeScreen: React.FC<
  ExportStackScreenProps<'ExportQRCode'>
> = ({}) => {
  const styles = useThemedStyle(themedStyle);

  const goToSettings = () =>
    RootNavigator.navigate('Main', { screen: 'Settings' });

  return (
    <QuaiPayContent>
      <View style={styles.separator} />
      <View style={styles.flexContainer}>
        <View style={styles.cardContainer}>
          <QuaiPayText type="H1">Recovery QR Code</QuaiPayText>
          <QuaiPayText type="paragraph" themeColor="secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissi
          </QuaiPayText>
        </View>
        <QuaiPayText style={styles.underline} themeColor="secondary">
          Learn more about QuaiPay
        </QuaiPayText>
      </View>
      <View style={styles.separator} />
      <Pressable
        onPress={goToSettings}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
      >
        <QuaiPayText type="H3">Complete</QuaiPayText>
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
