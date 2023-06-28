import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import BaselineError from 'src/shared/assets/baselineError.svg';
import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPaySeedPhraseLayoutDisplay,
  QuaiPayText,
  seedPhraseLayoutDisplayWordThemedStyle,
} from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';
import { typography } from 'src/shared/styles';
import { getEntropyFromSeedPhrase } from 'src/shared/utils/seedPhrase';

import { OnboardingStackScreenProps } from '../OnboardingStack';
import { useTranslation } from 'react-i18next';

const AMOUNT_OF_WORDS_IN_PHRASE = 24;

const isWindowSmallerThanScreen =
  Dimensions.get('window').height < Dimensions.get('screen').height;

export const LoginSeedPhraseInputScreen: React.FC<
  OnboardingStackScreenProps<'LoginSeedPhraseInput'>
> = ({ navigation }) => {
  const { t } = useTranslation();
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
    <QuaiPayContent containerStyle={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView alwaysBounceVertical={isWindowSmallerThanScreen}>
          <View style={styles.textContainer}>
            <QuaiPayText type="H1" style={styles.title}>
              {t('onboarding.login.phraseInput.title')}
            </QuaiPayText>
            <QuaiPayText type="paragraph" themeColor="secondary">
              {t('onboarding.login.phraseInput.description')}
            </QuaiPayText>
          </View>
          <View style={styles.bannerContainer}>
            <BaselineError />
            <QuaiPayText style={styles.bannerText}>
              {t('onboarding.login.phraseInput.bannerMsg')}
            </QuaiPayText>
          </View>
          <QuaiPaySeedPhraseLayoutDisplay showIndex>
            {seedPhraseWords.map((w, idx) => (
              <TextInput
                key={idx}
                style={[
                  typography.bold,
                  wordStyle,
                  styles.input,
                  styles.textInput,
                ]}
                defaultValue={w}
                onChangeText={value => changeWordOnPhrase(value, idx)}
              />
            ))}
          </QuaiPaySeedPhraseLayoutDisplay>
          <View style={styles.separator} />
          <QuaiPayButton
            disabled={!isPhraseValid}
            title={t('common.continue')}
            onPress={onSuccessful}
            style={styles.continue}
          />
          <View style={styles.doubleSeparator} />
        </ScrollView>
      </KeyboardAvoidingView>
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
      marginBottom: 12,
    },
    input: {
      paddingBottom: 10,
    },
    textInput: {
      color: theme.primary,
    },
    title: {
      marginBottom: 8,
    },
    textContainer: {
      alignItems: 'center',
      marginHorizontal: 48,
    },
    bannerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.surfaceVariant,
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginVertical: 16,
      marginHorizontal: 58,
      borderWidth: 1,
      borderColor: theme.normal,
      borderRadius: 4,
      gap: 4,
    },
    bannerText: {
      maxWidth: '90%',
    },
    separator: {
      height: 40,
    },
    doubleSeparator: {
      height: 80,
    },
  });
