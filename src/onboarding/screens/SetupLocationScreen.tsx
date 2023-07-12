import React, { useCallback, useState } from 'react';
import Geolocation, {
  GeoOptions,
  GeoPosition,
} from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, StyleSheet, View } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
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

import { OnboardingStackScreenProps } from '../OnboardingStack';

async function getPosition(options?: GeoOptions): Promise<GeoPosition> {
  return new Promise((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject, options),
  );
}

export const SetupLocationScreen: React.FC<
  OnboardingStackScreenProps<'SetupLocation'>
> = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.setup.location',
  });
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const [loading, setGettingLocation] = useState(false);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const permission =
        parseInt(Platform.Version, 10) < 13
          ? PERMISSIONS.IOS.LOCATION_ALWAYS
          : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      return await request(permission);
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('granted', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can use Geolocation');
          return true;
        } else {
          console.log('You cannot use Geolocation');
          return false;
        }
      } catch (err) {
        console.log(err);
        return false;
      }
    }
  };

  const getLocation = useCallback(async () => {
    setGettingLocation(true);
    const result = await requestLocationPermission();
    if (result) {
      const position = await getPosition({
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      });
      const { latitude, longitude } = position.coords;
      await storeItem({
        key: keychainKeys.location,
        value: JSON.stringify({ latitude, longitude }),
      });

      setGettingLocation(false);
      await AsyncStorage.setItem('onboarded', 'true');
      RootNavigator.goHome();
    }
  }, []);

  return loading ? (
    <QuaiPayLoader text={t('loading')} />
  ) : (
    <QuaiPayContent hasBackgroundVariant containerStyle={styles.mainContainer}>
      <QuaiPayText type="H1">{t('title')}</QuaiPayText>
      <QuaiPayText style={styles.description}>{t('description')}</QuaiPayText>
      <View style={styles.separator} />
      <QuaiPayButton
        title={tCommon('continue')}
        onPress={getLocation}
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
