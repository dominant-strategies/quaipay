import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { OnboardingStackNavigationProp } from 'src/onboarding/OnboardingStack';
import {
  QuaiPayButton,
  QuaiPayLoader,
  QuaiPayText,
} from 'src/shared/components';
import { useWalletContext } from 'src/shared/context/walletContext';

interface KeyChainEntropyCheckModalBodyProps {
  entropy?: string;
  dismiss: () => void;
  navigation: OnboardingStackNavigationProp<'LoginLanding'>;
}

export const KeyChainEntropyCheckModalBody: React.FC<
  KeyChainEntropyCheckModalBodyProps
> = ({ entropy, dismiss, navigation }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.login.landing.keychainBottomSheet',
  });
  const { initNameAndProfileFromKeychain, initWalletFromKeychain } =
    useWalletContext();
  const [checkingStoredInfo, setCheckingStoredInfo] = useState(false);
  const [checkUserInfo, setCheckUserInfo] = useState(false);

  const onContinue = async () => {
    try {
      setCheckingStoredInfo(true);
      await initWalletFromKeychain(entropy);
    } catch (err) {
      if (err instanceof Error) {
        console.log('failed to fetch keychain data', err.message, err.stack);
      } else {
        console.log('failed to fetch keychain data', err);
      }
    } finally {
      setCheckUserInfo(true);
    }
  };

  const fetchUserInfo = useCallback(async () => {
    initNameAndProfileFromKeychain()
      .catch(err => {
        if (err instanceof Error) {
          console.log('failed to fetch keychain data', err.message, err.stack);
        } else {
          console.log('failed to fetch keychain data', err);
        }
      })
      .then(_ => {
        setCheckingStoredInfo(false);
        setCheckUserInfo(false);
        dismiss();
        return _;
      })
      .then(isSuccessful => {
        navigation.navigate(isSuccessful ? 'SetupLocation' : 'SetupNameAndPFP');
      });
  }, []);

  useEffect(() => {
    if (checkUserInfo) {
      fetchUserInfo();
    }
  }, [checkUserInfo]);

  if (checkingStoredInfo) {
    return (
      <QuaiPayLoader
        backgroundColor="transparent"
        text={
          checkUserInfo
            ? 'Checking user info'
            : 'Checking which data is already stored'
        }
      />
    );
  }

  return (
    <View style={styles.mainContainer}>
      <QuaiPayText type="H2">{t('title')}</QuaiPayText>
      <View style={styles.separator} />
      <QuaiPayText type="paragraph" style={styles.description}>
        {t('description')}
      </QuaiPayText>
      <View style={styles.separator} />
      <View style={styles.buttonsContainer}>
        <QuaiPayButton
          onPress={dismiss}
          outlined
          type={'secondary'}
          title={t('dismissButton')}
        />
        <QuaiPayButton onPress={onContinue} title={t('continueButton')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 32,
    marginHorizontal: 16,
  },
  separator: {
    flex: 1,
  },
  description: {
    textAlign: 'left',
    marginHorizontal: 12,
  },
  buttonsContainer: {
    gap: 16,
  },
});
