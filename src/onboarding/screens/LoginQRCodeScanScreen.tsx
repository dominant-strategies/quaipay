import React from 'react';
import { StyleSheet } from 'react-native';

import { QuaiPayButton, QuaiPayContent } from 'src/shared/components';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const LoginQRCodeScanScreen: React.FC<
  OnboardingStackScreenProps<'LoginQRCodeScan'>
> = ({ navigation }) => {
  const onSuccessfulScan = () => {
    // TODO: call to setup wallet with scanned entropy value
    navigation.navigate('SetupNameAndPFP');
  };
  return (
    <QuaiPayContent title="LoginQRCodeScan" containerStyle={styles.container}>
      <QuaiPayButton title="On Successful Scan" onPress={onSuccessfulScan} />
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
