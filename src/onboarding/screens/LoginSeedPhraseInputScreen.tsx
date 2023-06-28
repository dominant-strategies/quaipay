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
import { getEntropyFromSeedPhrase } from 'src/shared/utils/seedPhrase';

import { OnboardingStackScreenProps } from '../OnboardingStack';

const AMOUNT_OF_WORDS_IN_PHRASE = 24;

export const LoginSeedPhraseInputScreen: React.FC<
  OnboardingStackScreenProps<'LoginSeedPhraseInput'>
> = ({ navigation }) => {
  const { word: wordStyle } = useThemedStyle(
    seedPhraseLayoutDisplayWordThemedStyle,
  );
  const styles = useThemedStyle(themedStyle);
  const [seedPhraseWords, setSeedPhraseWords] = useState<string[]>(
    Array(AMOUNT_OF_WORDS_IN_PHRASE).fill(''),
  );
  const [isPhraseValid, setIsPhraseValid] = useState(false);

  const changeWordOnPhrase = (value: string, idx: number) => {
    setSeedPhraseWords(prevState => {
      const parsedValue = value.split(' ');
      if (parsedValue.length <= 1) {
        // Take element on idx and replace it with value
        prevState.splice(idx, 1, value);
        return prevState;
      } else if (parsedValue.length >= AMOUNT_OF_WORDS_IN_PHRASE) {
        // Replace whole phrase and stop at the end (omit rest if any)
        return parsedValue.splice(0, AMOUNT_OF_WORDS_IN_PHRASE);
      } else {
        // Paste from current until the end
        return prevState.map((word, n) => {
          const slicedId = (n - idx) % AMOUNT_OF_WORDS_IN_PHRASE;
          return parsedValue[slicedId] ? parsedValue[slicedId] : word;
        });
      }
    });
    setIsPhraseValid(validatePhrase(seedPhraseWords.join(' ').toLowerCase()));
  };

  const validatePhrase = (phrase: string) => {
    const a = Uint8Array.from(
      Buffer.from(getEntropyFromSeedPhrase(phrase) ?? '', 'hex'),
    )?.byteLength;
    const b = (seedPhraseWords.length * 8) / 6;
    return a === b;
  };

  const onSuccessful = () => {
    if (isPhraseValid) {
      // TODO: setup wallet with given seed phrase
      navigation.navigate('SetupNameAndPFP');
    }
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
        disabled={!isPhraseValid}
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
