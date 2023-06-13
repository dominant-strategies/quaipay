import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

import { ExportStackScreenProps } from './ExportStack';

// TODO: move copy to i18n
// TODO: tweak UI to match L&F
export const ExportLandingScreen: React.FC<
  ExportStackScreenProps<'ExportLanding'>
> = ({ navigation }) => {
  const styles = useThemedStyle(themedStyle);

  const goToSetupSeedPhrase = () => navigation.navigate('ExportPhrase');

  return (
    <QuaiPayContent>
      <View style={styles.textContainer}>
        <QuaiPayText type="H1">Setup Account Recovery</QuaiPayText>
        <QuaiPayText type="H3">Description</QuaiPayText>
      </View>
      <Pressable
        onPress={goToSetupSeedPhrase}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.5 }]}
      >
        <QuaiPayText>Set up Seed Phrase</QuaiPayText>
      </Pressable>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.5 }]}
      >
        <QuaiPayText>Account Recovery QR Code</QuaiPayText>
      </Pressable>
      <View style={styles.separator} />
      <QuaiPayText style={styles.learnMore}>Learn more</QuaiPayText>
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
    card: {
      backgroundColor: theme.secondary,
      marginBottom: 12,
      padding: 10,
      marginHorizontal: 32,
    },
    learnMore: {
      marginBottom: 70,
    },
    separator: {
      flex: 1,
    },
  });
