import React, { useState } from 'react';

import { StyleSheet } from 'react-native';
import { OnboardingStackScreenProps } from '../OnboardingStack';
import { QuaiPayButton, QuaiPayContent } from 'src/shared/components';

export const OnboardingTerms: React.FC<
  OnboardingStackScreenProps<'OnboardingTerms'>
> = ({ navigation }) => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const toggleTerms = () => setTermsAccepted(prevState => !prevState);

  const onContinue = () => {
    // TODO: setup wallet
    navigation.navigate('SetupLocation');
  };

  return (
    <QuaiPayContent title="OnBoardingTerms" containerStyle={styles.container}>
      <QuaiPayButton title="Press to accept terms" onPress={toggleTerms} />
      <QuaiPayButton
        disabled={!termsAccepted}
        title="On Terms Accepted"
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
