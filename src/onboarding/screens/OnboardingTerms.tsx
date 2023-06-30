import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayLoader,
  QuaiPayText,
} from 'src/shared/components';
import { useWalletContext } from 'src/shared/context/walletContext';

import { OnboardingStackScreenProps } from '../OnboardingStack';
import { setUpWallet } from '../services/setUpWallet';

export const OnboardingTerms: React.FC<
  OnboardingStackScreenProps<'OnboardingTerms'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.terms',
  });
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { setEntropy, setWallet } = useWalletContext();
  const [settingUpWallet, setSettingUpWallet] = useState(false);

  const toggleTerms = () => setTermsAccepted(prevState => !prevState);

  const onContinue = useCallback(async () => {
    try {
      setSettingUpWallet(true);
      const { entropy, wallet } = await setUpWallet();
      setEntropy(entropy);
      setWallet(wallet);

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
      <QuaiPayText>{t('title')}</QuaiPayText>
      <QuaiPayText>{t('termsAndConditions')}</QuaiPayText>
      <QuaiPayText>{t('termsContent')}</QuaiPayText>
      <QuaiPayButton title={t('agree')} onPress={toggleTerms} />
      <QuaiPayButton
        disabled={!termsAccepted}
        title={tCommon('continue')}
        onPress={onContinue}
      />
    </QuaiPayContent>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    marginHorizontal: 20,
  },
});
