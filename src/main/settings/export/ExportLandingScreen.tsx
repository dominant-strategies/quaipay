import React from 'react';
import {
  Dimensions,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import RightChevron from 'src/shared/assets/rightChevron.svg';
import EditIcon from 'src/shared/assets/edit.svg';
import PhoneWithQR from 'src/shared/assets/phoneWithQR.svg';

import { ExportStackScreenProps } from './ExportStack';

const isWindowSmallerThanScreen =
  Dimensions.get('window').height < Dimensions.get('screen').height;

export const ExportLandingScreen: React.FC<
  ExportStackScreenProps<'ExportLanding'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'export.landing' });
  const styles = useThemedStyle(themedStyle);

  // TODO: update to use the actual page
  const goToLearnMoreRecovery = () =>
    Linking.openURL('https://docs.quai.network/use-quai/wallets');
  const goToSetupSeedPhrase = () => navigation.navigate('ExportPhrase');
  const goToQRCode = () => navigation.navigate('ExportQRCode');

  return (
    <QuaiPayContent>
      <ScrollView alwaysBounceVertical={isWindowSmallerThanScreen}>
        <View style={styles.textContainer}>
          <QuaiPayText type="H1" style={styles.title}>
            {t('title')}
          </QuaiPayText>
          <QuaiPayText type="paragraph">{t('description')}</QuaiPayText>
        </View>
        <Pressable
          onPress={goToSetupSeedPhrase}
          style={({ pressed }) => [styles.card, pressed && { opacity: 0.5 }]}
        >
          <EditIcon />
          <View style={styles.cardTextContainer}>
            <QuaiPayText type="H3" style={styles.cardText}>
              {t('cards.setup.title')}
            </QuaiPayText>
            <QuaiPayText style={styles.cardText}>
              {t('cards.setup.description')}
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
              {t('cards.qr.title')}
            </QuaiPayText>
            <QuaiPayText style={styles.cardText}>
              {t('cards.qr.description')}
            </QuaiPayText>
          </View>

          <RightChevron />
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          onPress={goToLearnMoreRecovery}
          style={({ pressed }) => [
            styles.learnMoreContainer,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText style={styles.learnMoreText}>
            {t('learnMore')}
          </QuaiPayText>
        </Pressable>
      </ScrollView>
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
