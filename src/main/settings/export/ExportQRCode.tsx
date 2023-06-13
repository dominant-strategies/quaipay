import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

import { ExportStackScreenProps } from './ExportStack';
import { RootNavigator } from 'src/shared/navigation/utils';

export const ExportQRCodeScreen: React.FC<
  ExportStackScreenProps<'ExportQRCode'>
> = ({}) => {
  const styles = useThemedStyle(themedStyle);

  // TODO: define what action should be made here
  const handleExportButton = () => false;
  const goToSettings = () =>
    RootNavigator.navigate('Main', { screen: 'Setting' });

  return (
    <QuaiPayContent>
      <View style={styles.separator} />
      <View style={styles.flexContainer}>
        <View style={styles.cardContainer}>
          <QuaiPayText type="H1">Recovery QR Code</QuaiPayText>
          <QuaiPayText type="H3">Description</QuaiPayText>
        </View>
        <QuaiPayText>Learn more</QuaiPayText>
      </View>
      <View style={styles.separator} />
      <Pressable
        onPress={handleExportButton}
        style={({ pressed }) => [
          styles.button,
          styles.reviewButton,
          pressed && { opacity: 0.5 },
        ]}
      >
        <QuaiPayText>Export</QuaiPayText>
      </Pressable>
      <Pressable
        onPress={goToSettings}
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.5 }]}
      >
        <QuaiPayText>Complete</QuaiPayText>
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
      flex: 1,
      alignItems: 'center',
      marginHorizontal: 16,
      marginBottom: 20,
      paddingHorizontal: 32,
      backgroundColor: theme.secondary,
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
  });
