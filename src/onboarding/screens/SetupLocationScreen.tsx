/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback, useState } from 'react';
import Geolocation, {
  GeoOptions,
  GeoPosition,
} from 'react-native-geolocation-service';
import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PERMISSIONS, request } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { buttonStyle, fontStyle, styledColors } from 'src/shared/styles';
import { storeItem } from 'src/shared/services/keychain';
import { keychainKeys } from 'src/shared/constants/keychainKeys';
import { RootNavigator } from 'src/shared/navigation/utils';
import { QuaiPayContent, QuaiPayLoader } from 'src/shared/components';

async function getPosition(options?: GeoOptions): Promise<GeoPosition> {
  return new Promise((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject, options),
  );
}
function SetupLocationScreen() {
  const isDarkMode = useColorScheme() === 'dark';
  const [gettingLocation, setGettingLocation] = useState(false);

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

  const topViewStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  };

  if (gettingLocation) {
    return <QuaiPayLoader text="Almost there!" />;
  }

  return (
    <QuaiPayContent hasBackgroundVariant>
      <View style={topViewStyle}>
        <Text
          style={{
            ...fontStyle.fontH1,
            ...styles.locationSetupTitle,
            color: isDarkMode ? Colors.white : Colors.black,
          }}
        >
          QuaiPay{'\n'}uses your location
        </Text>
        <View style={styles.locationSetupDescriptionView}>
          <Text
            style={{
              ...fontStyle.fontSmallText,
              ...styles.locationSetupDescription,
            }}
          >
            Lorem ipsum dolor sit amet, consecteturadipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum
          </Text>
        </View>
        <View style={styles.locationSetupDescriptionView}>
          <Text
            style={{
              ...fontStyle.fontSmallText,
              ...styles.locationSetupDescription,
            }}
          >
            Learn More
          </Text>
        </View>
        <TouchableOpacity
          style={{ marginLeft: 21, marginRight: 21, marginTop: 40 }}
          onPress={getLocation}
        >
          <Text
            style={{
              ...fontStyle.fontH3,
              ...(isDarkMode ? buttonStyle.white : buttonStyle.normal),
              borderRadius: 30,
            }}
          >
            {' '}
            Setup{' '}
          </Text>
        </TouchableOpacity>
      </View>
    </QuaiPayContent>
  );
}

const styles = StyleSheet.create({
  locationSetupTitle: {
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  locationSetupSectionView: {
    marginTop: 40,
  },
  loginSection: {
    color: Colors.black,
    verticalAlign: 'middle',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 30,
  },
  locationSetupDescriptionView: {
    marginTop: 15,
  },
  locationSetupDescription: {
    color: Colors.light,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 20,
  },
});

export default SetupLocationScreen;
