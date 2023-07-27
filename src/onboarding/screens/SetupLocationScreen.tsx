import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';

import { RootNavigator } from 'src/shared/navigation/utils';
import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayText,
} from 'src/shared/components';
import { Zone } from 'src/shared/types';
import { regionImgs, zoneRegionMap } from 'src/shared/assets/regions';
import { typography } from 'src/shared/styles';
import { useTheme } from 'src/shared/context/themeContext';
import { useWalletContext } from 'src/shared/context/walletContext';

import { OnboardingStackScreenProps } from '../OnboardingStack';

const INITIAL_ZONE = Zone['zone-0-0'];

const isWindowSmallerThanScreen =
  Dimensions.get('window').height < Dimensions.get('screen').height;

export const SetupLocationScreen: React.FC<
  OnboardingStackScreenProps<'SetupLocation'>
> = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.setup.location',
  });
  const { theme } = useTheme();
  const { t: tCommon } = useTranslation('translation', { keyPrefix: 'common' });
  const { setZone } = useWalletContext();
  const [selectedZone, setSelectedZone] = useState(INITIAL_ZONE);

  const setupLocation = async () => {
    setZone(selectedZone);
    await AsyncStorage.setItem('onboarded', 'true');
    RootNavigator.goHome();
  };

  return (
    <QuaiPayContent hasBackgroundVariant containerStyle={styles.mainContainer}>
      <ScrollView
        alwaysBounceVertical={isWindowSmallerThanScreen}
        showsVerticalScrollIndicator={false}
      >
        <QuaiPayText type="H1">{t('title')}</QuaiPayText>
        <QuaiPayText style={styles.description}>{t('description')}</QuaiPayText>
        <View style={styles.separator} />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={regionImgs[zoneRegionMap[selectedZone]]}
          />
        </View>
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
        <View style={styles.separator} />
      </ScrollView>
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
  imageContainer: {
    alignContent: 'center',
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: undefined,
    aspectRatio: 359 / 182,
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
