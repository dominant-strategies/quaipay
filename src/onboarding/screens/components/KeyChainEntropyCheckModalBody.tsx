import React, { useEffect, useState } from 'react';
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
      initWalletFromKeychain(entropy);
      setCheckUserInfo(true);
    } catch (err) {
      if (err instanceof Error) {
        console.log('failed to fetch keychain data', err.message, err.stack);
      } else {
        console.log('failed to fetch keychain data', err);
      }
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const isSuccessful = await initNameAndProfileFromKeychain();
        if (isSuccessful) {
          navigation.navigate('SetupLocation');
        } else {
          navigation.navigate('SetupNameAndPFP');
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log('failed to fetch keychain data', err.message, err.stack);
        } else {
          console.log('failed to fetch keychain data', err);
        }
      } finally {
        setCheckingStoredInfo(false);
        setCheckUserInfo(false);
        dismiss();
      }
    };

    if (checkUserInfo) {
      fetchUserInfo();
    }
  }, [checkUserInfo]);

  return (
    <View style={styles.mainContainer}>
      {checkingStoredInfo ? (
        <QuaiPayLoader
          backgroundColor="transparent"
          text={
            checkUserInfo
              ? 'Checking user info'
              : 'Checking which data is already stored'
          }
        />
      ) : (
        <>
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
        </>
      )}
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
