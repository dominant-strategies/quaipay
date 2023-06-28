import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPaySeedPhraseLayoutDisplay,
  seedPhraseLayoutDisplayWordThemedStyle,
} from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';
import { typography } from 'src/shared/styles';

import { OnboardingStackScreenProps } from '../OnboardingStack';

const AMOUNT_OF_WORDS_IN_PHRASE = 24;

export const LoginSeedPhraseInputScreen: React.FC<
  OnboardingStackScreenProps<'LoginSeedPhraseInput'>
> = ({ navigation }) => {
  const { word: wordStyle } = useThemedStyle(
    seedPhraseLayoutDisplayWordThemedStyle,
  );
  const styles = useThemedStyle(themedStyle);
  const [seedPhraseWords, setSeedPhraseWords] = useState(
    Array(AMOUNT_OF_WORDS_IN_PHRASE).fill(''),
  );

  const changeWordOnPhrase = (value: string, idx: number) => {
    setSeedPhraseWords(prevState => {
      prevState.splice(idx, 1, value); // Take element on idx and replace it with value
      return prevState;
    });
  };

  const onSuccessful = () => {
    // TODO: setup wallet with given seed phrase
    navigation.navigate('SetupNameAndPFP');
  };

  return (
    <QuaiPayContent
      title="LoginSeedPhraseInput"
      containerStyle={styles.container}
    >
      <QuaiPaySeedPhraseLayoutDisplay showIndex>
        {seedPhraseWords.map((w, idx) => (
          <TextInput
            key={idx}
            style={[typography.bold, wordStyle, styles.input, styles.textInput]}
            defaultValue={w}
            onChangeText={value => changeWordOnPhrase(value, idx)}
          />
        ))}
      </QuaiPaySeedPhraseLayoutDisplay>
      <QuaiPayButton
        title="On Successful Seed Phrase"
        onPress={onSuccessful}
        style={styles.continue}
      />
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
    },
    continue: {
      marginHorizontal: 20,
    },
    input: {
      paddingBottom: 10,
    },
    textInput: {
      color: theme.primary,
    },
  });
