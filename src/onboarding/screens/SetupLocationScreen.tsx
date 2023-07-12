import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';

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
import { zoneRegionMap } from 'src/shared/assets/regions';
import { typography } from 'src/shared/styles';
import { useTheme } from 'src/shared/context/themeContext';

import { OnboardingStackScreenProps } from '../OnboardingStack';

const INITIAL_ZONE = Zone['zone-0-0'];

export const SetupLocationScreen: React.FC<
  OnboardingStackScreenProps<'SetupLocation'>
> = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.setup.location',
  });
  const { theme } = useTheme();
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const [loading, setGettingLocation] = useState(false);
  const [selectedZone, setSelectedZone] = useState(INITIAL_ZONE);

  const setupLocation = async () => {
    setGettingLocation(true);
    await storeItem({
      key: keychainKeys.location,
      // TODO: get from selector
      value: JSON.stringify({ zone: selectedZone }),
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
      <Picker
        mode="dropdown"
        selectedValue={selectedZone}
        itemStyle={{ ...styles.pickerItem, color: theme.primary }}
        onValueChange={item => setSelectedZone(item)}
      >
        {Object.values(Zone).map((item, idx) => (
          <Picker.Item
            key={idx}
            label={zoneRegionMap[item]}
            value={item}
            color={item === selectedZone ? theme.normal : theme.primary}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
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
  pickerItem: {
    ...typography.H3,
  },
});
