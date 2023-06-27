import React from 'react';
import { StyleSheet } from 'react-native';

import { QuaiPayButton, QuaiPayContent } from 'src/shared/components';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const LoginLandingScreen: React.FC<
  OnboardingStackScreenProps<'LoginLanding'>
> = ({}) => {
  return (
    <QuaiPayContent title="LoginLanding" containerStyle={styles.container}>
      <QuaiPayButton title="Import wallet from device" />
      <QuaiPayButton title="Enter your seed phrase" />
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
