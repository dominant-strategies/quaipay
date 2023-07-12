import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

import { storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';
import { RootNavigator } from 'src/shared/navigation/utils';
import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayLoader,
  QuaiPayText,
} from 'src/shared/components';
import { Zone } from 'src/shared/types';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const SetupLocationScreen: React.FC<
  OnboardingStackScreenProps<'SetupLocation'>
> = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.setup.location',
  });
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const [loading, setGettingLocation] = useState(false);

  const setupLocation = async () => {
    setGettingLocation(true);
    await storeItem({
      key: keychainKeys.location,
      // TODO: get from selector
      value: JSON.stringify({ zone: Zone['zone-0-0'] }),
    });

    setGettingLocation(false);
    await AsyncStorage.setItem('onboarded', 'true');
    RootNavigator.goHome();
  };

  return loading ? (
    <QuaiPayLoader text={t('loading')} />
  ) : (
    <QuaiPayContent hasBackgroundVariant containerStyle={styles.mainContainer}>
      <QuaiPayText type="H1">{t('title')}</QuaiPayText>
      <QuaiPayText style={styles.description}>{t('description')}</QuaiPayText>
      <View style={styles.separator} />
      <QuaiPayButton
        title={tCommon('continue')}
        onPress={setupLocation}
        style={styles.continueButton}
      />
    </QuaiPayContent>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
  },
  description: {
    marginVertical: 16,
    marginHorizontal: 32,
  },
  continueButton: {
    marginVertical: 16,
  },
  separator: {
    flex: 1,
  },
});
