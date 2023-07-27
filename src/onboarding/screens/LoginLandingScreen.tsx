import React, { useEffect } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import RightChevron from 'src/shared/assets/rightChevron.svg';
import EditIcon from 'src/shared/assets/edit.svg';
import PhoneWithQR from 'src/shared/assets/phoneWithQR.svg';
import {
  QuaiPayBottomSheetModal,
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayText,
  useBottomSheetModal,
} from 'src/shared/components';
import { useEntropy, useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';

import { OnboardingStackScreenProps } from '../OnboardingStack';
import { KeyChainEntropyCheckModalBody } from './components/KeyChainEntropyCheckModalBody';

export const LoginLandingScreen: React.FC<
  OnboardingStackScreenProps<'LoginLanding'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.login.landing',
  });
  const styles = useThemedStyle(themedStyle);
  const entropy = useEntropy(false); // Setting showError snackbar as false
  const {
    close: closeRecoverModal,
    open: openRecoverModal,
    ref,
  } = useBottomSheetModal();

  const goToQRCodeScan = () => navigation.navigate('LoginQRCodeScan');
  const goToSeedPhraseInput = () => navigation.navigate('LoginSeedPhraseInput');
  // TODO: update to use the actual page
  const goToLearnMoreRecovery = () =>
    Linking.openURL('https://docs.quai.network/use-quai/wallets');

  useEffect(() => {
    if (entropy) {
      openRecoverModal();
    }
  }, [entropy]);

  return (
    <QuaiPayContent>
      <View style={styles.textContainer}>
        <QuaiPayText type="H1" style={styles.title}>
          {t('title')}
        </QuaiPayText>
        <QuaiPayText type="paragraph" themeColor="secondary">
          {t('description')}
        </QuaiPayText>
      </View>
      <View style={styles.separator} />
      <Pressable
        onPress={goToQRCodeScan}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.5 }]}
      >
        <PhoneWithQR />
        <View style={styles.cardTextContainer}>
          <QuaiPayText type="H3" style={styles.cardText}>
            {t('cards.qr.title')}
          </QuaiPayText>
          <QuaiPayText themeColor="secondary" style={styles.cardText}>
            {t('cards.qr.description')}
          </QuaiPayText>
        </View>
        <RightChevron />
      </Pressable>
      <Pressable
        onPress={goToSeedPhraseInput}
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.5 }]}
      >
        <EditIcon />
        <View style={styles.cardTextContainer}>
          <QuaiPayText type="H3" style={styles.cardText}>
            {t('cards.phrase.title')}
          </QuaiPayText>
          <QuaiPayText themeColor="secondary" style={styles.cardText}>
            {t('cards.phrase.description')}
          </QuaiPayText>
        </View>
        <RightChevron />
      </Pressable>
      <View style={styles.doubleSeparator} />
      <QuaiPayButton
        underline
        type="secondary"
        titleType="default"
        title={t('learnMore')}
        onPress={goToLearnMoreRecovery}
        style={styles.learnMore}
      />
      <QuaiPayBottomSheetModal ref={ref}>
        <KeyChainEntropyCheckModalBody
          entropy={entropy}
          dismiss={closeRecoverModal}
          navigation={navigation}
        />
      </QuaiPayBottomSheetModal>
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    title: {
      marginBottom: 8,
    },
    textContainer: {
      alignItems: 'center',
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
    learnMore: {
      marginBottom: 70,
      paddingVertical: 10,
      marginHorizontal: 24,
    },
    separator: {
      flex: 1,
    },
    doubleSeparator: {
      flex: 2,
    },
  });
