import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import RightChevron from 'src/shared/assets/rightChevron.svg';
import EditIcon from 'src/shared/assets/edit.svg';
import PhoneWithQR from 'src/shared/assets/phoneWithQR.svg';

import { ExportStackScreenProps } from './ExportStack';

// TODO: move copy to i18n
export const ExportLandingScreen: React.FC<
  ExportStackScreenProps<'ExportLanding'>
> = ({ navigation }) => {
  const styles = useThemedStyle(themedStyle);
  // TODO: check if seed phrase was already generated
  const hasSeedPhraseAlready = true;

  const goToSetupSeedPhrase = () => navigation.navigate('ExportPhrase');
  const goToQRCode = () =>
    hasSeedPhraseAlready
      ? navigation.navigate('ExportQRCode')
      : // eslint-disable-next-line no-alert
        alert('Please setup your seed phrase first');

  return (
    <QuaiPayContent>
      <View style={styles.textContainer}>
        <QuaiPayText type="H1" style={styles.title}>
          Setup Account Recovery
        </QuaiPayText>
        <QuaiPayText type="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Se
        </QuaiPayText>
      </View>
      <Pressable
        onPress={goToSetupSeedPhrase}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.5 }]}
      >
        <EditIcon />
        <View style={styles.cardTextContainer}>
          <QuaiPayText type="H3" style={styles.cardText}>
            Set up Seed Phrase
          </QuaiPayText>
          <QuaiPayText style={styles.cardText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a,
          </QuaiPayText>
        </View>
        <RightChevron />
      </Pressable>
      <Pressable
        onPress={goToQRCode}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.5 }]}
      >
        <PhoneWithQR />
        <View style={styles.cardTextContainer}>
          <QuaiPayText type="H3" style={styles.cardText}>
            Account Recovery QR Code
          </QuaiPayText>
          <QuaiPayText style={styles.cardText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a,
          </QuaiPayText>
        </View>

        <RightChevron />
      </Pressable>
      <View style={styles.separator} />
      <Pressable
        style={({ pressed }) => [
          styles.learnMoreContainer,
          pressed && { opacity: 0.5 },
        ]}
      >
        <QuaiPayText style={styles.learnMoreText}>
          Learn more about the recovery process.
        </QuaiPayText>
      </Pressable>
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    textContainer: {
      alignItems: 'center',
      marginBottom: 20,
      marginHorizontal: 48,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surfaceVariant,
      marginBottom: 12,
      paddingVertical: 40,
      marginHorizontal: 24,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    cardTextContainer: {
      flexShrink: 1,
      marginRight: 'auto',
      paddingHorizontal: 16,
    },
    cardText: {
      textAlign: 'left',
    },
    title: {
      marginBottom: 8,
    },
    learnMoreContainer: {
      marginBottom: 70,
      paddingVertical: 10,
      marginHorizontal: 24,
    },
    learnMoreText: {
      textDecorationLine: 'underline',
    },
    separator: {
      flex: 1,
    },
  });
