import React from 'react';
import { StyleSheet } from 'react-native';

import { QuaiPayButton, QuaiPayContent } from 'src/shared/components';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const LoginSeedPhraseInputScreen: React.FC<
  OnboardingStackScreenProps<'LoginSeedPhraseInput'>
> = ({ navigation }) => {
  const onSuccessful = () => {
    // TODO: setup wallet with given seed phrase
    navigation.navigate('SetupNameAndPFP');
  };

  return (
    <QuaiPayContent
      title="LoginSeedPhraseInput"
      containerStyle={styles.container}
    >
      <QuaiPayButton title="On Successful Seed Phrase" onPress={onSuccessful} />
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
