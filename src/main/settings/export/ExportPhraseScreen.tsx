import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-community/clipboard';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import BaselineError from 'src/shared/assets/baselineError.svg';
import EyeOutline from 'src/shared/assets/eyeOutline.svg';
import HideIcon from 'src/shared/assets/hide.svg';
import CopyOutline from 'src/shared/assets/copyOutline.svg';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';

import { ExportStackScreenProps } from './ExportStack';
import { SeedPhraseDisplay } from './components/SeedPhraseDisplay';
import { styledColors } from 'src/shared/styles';

const isWindowSmallerThanScreen =
  Dimensions.get('window').height < Dimensions.get('screen').height;

// Mock implementation
// TODO: actually generate seed phrase
const useSeedPhrase = () =>
  'Fish Squirrel Brave Animal Plant Bicycle Sticky Spatula Eagle Tree Asana Macro';

export const ExportPhraseScreen: React.FC<
  ExportStackScreenProps<'ExportPhrase'>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);

  const [isSeedPhraseHidden, setIsSeedPhraseHidden] = useState(true);
  const seedPhrase = useSeedPhrase();

  const toggleShowSeedPhrase = () =>
    setIsSeedPhraseHidden(prevState => !prevState);
  const copyToClipboard = () => {
    Clipboard.setString(seedPhrase ?? '');
    alert(t('export.phrase.phraseCopied'));
  };
  const goToConfirmPhrase = () =>
    navigation.navigate('ExportConfirmationPhrase');

  return (
    <QuaiPayContent>
      <ScrollView alwaysBounceVertical={isWindowSmallerThanScreen}>
        <View style={styles.textContainer}>
          <QuaiPayText type="H1" style={styles.title}>
            {t('export.phrase.title')}
          </QuaiPayText>
          <QuaiPayText type="paragraph" themeColor="secondary">
            {t('export.phrase.description')}
          </QuaiPayText>
        </View>
        <View style={styles.disclaimerContainer}>
          <BaselineError />
          <QuaiPayText allowFontScaling style={styles.disclaimerText}>
            {t('export.phrase.screenShotBanner')}
          </QuaiPayText>
        </View>
        <Pressable
          onPress={toggleShowSeedPhrase}
          style={({ pressed }) => [
            styles.revealButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="H3" themeColor="secondary">
            {isSeedPhraseHidden
              ? t('export.phrase.revealPhrase')
              : t('export.phrase.hidePhrase')}
          </QuaiPayText>
          {isSeedPhraseHidden ? <EyeOutline /> : <HideIcon />}
        </Pressable>
        <SeedPhraseDisplay hide={isSeedPhraseHidden} seedPhrase={seedPhrase} />
        <View style={styles.separator} />
        <Pressable
          onPress={copyToClipboard}
          style={({ pressed }) => [
            styles.copyToClipboardButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="bold" themeColor="secondary">
            {t('export.phrase.copyToClipboard')}
          </QuaiPayText>
          <CopyOutline />
        </Pressable>
        <View style={styles.doubleSeparator} />
        <Pressable
          onPress={goToConfirmPhrase}
          style={({ pressed }) => [
            styles.continueButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText style={styles.whiteColor}>
            {t('common.continue')}
          </QuaiPayText>
        </Pressable>
        <View style={styles.doubleSeparator} />
      </ScrollView>
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    textContainer: {
      alignItems: 'center',
      marginHorizontal: 48,
    },
    disclaimerContainer: {
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
    disclaimerText: {
      maxWidth: '90%', // To avoid text overflow in german
    },
    title: {
      marginBottom: 8,
    },
    revealButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 8,
      gap: 8,
      marginBottom: 24,
    },
    copyToClipboardButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      padding: 16,
      gap: 8,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 4,
    },
    continueButton: {
      padding: 10,
      marginHorizontal: 30,
      backgroundColor: theme.normal,
    },
    separator: {
      height: 40,
    },
    doubleSeparator: {
      height: 80,
    },
    whiteColor: {
      color: styledColors.white,
    },
  });
