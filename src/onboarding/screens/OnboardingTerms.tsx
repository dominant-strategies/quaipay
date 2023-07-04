import React, { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import CheckBold from 'src/shared/assets/checkBold.svg';
import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayLoader,
  QuaiPayText,
} from 'src/shared/components';
import { useWalletContext } from 'src/shared/context/walletContext';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';

import { OnboardingStackScreenProps } from '../OnboardingStack';
import { setUpWallet } from '../services/setUpWallet';

export const OnboardingTerms: React.FC<
  OnboardingStackScreenProps<'OnboardingTerms'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.terms',
  });
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const styles = useThemedStyle(themedStyle);

  const [termsAccepted, setTermsAccepted] = useState(false);
  const { initFromOnboarding } = useWalletContext();
  const [settingUpWallet, setSettingUpWallet] = useState(false);

  const toggleTerms = () => setTermsAccepted(prevState => !prevState);

  const onContinue = useCallback(async () => {
    try {
      setSettingUpWallet(true);
      const onboardingInfo = await setUpWallet();
      initFromOnboarding(onboardingInfo);

      navigation.navigate('SetupNameAndPFP');
    } catch (err) {
      if (err instanceof Error) {
        console.log('failed to set up wallet', err.message, err.stack);
      } else {
        console.log('failed to set up wallet', err);
      }
    } finally {
      setSettingUpWallet(false);
    }
  }, [navigation]);

  if (settingUpWallet) {
    return <QuaiPayLoader text="Setting up wallet" />;
  }

  return (
    <QuaiPayContent containerStyle={styles.container}>
      <QuaiPayText type="H1">{t('title')}</QuaiPayText>
      <View style={styles.separator} />
      <ScrollView>
        <QuaiPayText type="bold" style={styles.terms}>
          {t('termsAndConditions')}
        </QuaiPayText>
        <QuaiPayText style={styles.terms}>{t('termsContent')}</QuaiPayText>
      </ScrollView>
      <Pressable onPress={toggleTerms} style={styles.agree}>
        <View style={styles.checkBoldContainer}>
          {termsAccepted ? (
            <CheckBold />
          ) : (
            <View style={styles.checkBoldBlank} />
          )}
        </View>
        <QuaiPayText style={styles.agreeText}>{t('agree')}</QuaiPayText>
      </Pressable>
      <QuaiPayButton
        disabled={!termsAccepted}
        title={tCommon('continue')}
        onPress={onContinue}
      />
      <View style={styles.doubleSeparator} />
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    terms: {
      textAlign: 'left',
      paddingHorizontal: 10,
    },
    agree: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 16,
      marginBottom: 24,
    },
    agreeText: {
      flexShrink: 1,
      textAlign: 'left',
      fontSize: 15,
    },
    checkBoldContainer: {
      borderWidth: 1,
      borderColor: theme.border,
    },
    checkBoldBlank: {
      height: 24,
      width: 24,
    },
    separator: {
      marginVertical: 4,
      flex: 1,
    },
    doubleSeparator: {
      marginVertical: 4,
      flex: 2,
    },
  });
