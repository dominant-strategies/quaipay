import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayText,
} from 'src/shared/components';
import BaselineError from 'src/shared/assets/baselineError.svg';
import EyeOutline from 'src/shared/assets/eyeOutline.svg';
import HideIcon from 'src/shared/assets/hide.svg';
import CopyOutline from 'src/shared/assets/copyOutline.svg';
import { Theme } from 'src/shared/types';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { useEntropy, useThemedStyle } from 'src/shared/hooks';
import { styledColors } from 'src/shared/styles';
import { getSeedPhraseFromEntropy } from 'src/shared/utils/seedPhrase';

import { SeedPhraseDisplay } from './components/SeedPhraseDisplay';
import { ExportStackScreenProps } from './ExportStack';

const isWindowSmallerThanScreen =
  Dimensions.get('window').height < Dimensions.get('screen').height;

export const ExportPhraseScreen: React.FC<
  ExportStackScreenProps<'ExportPhrase'>
> = ({ navigation }) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const entropy = useEntropy();
  const { showSnackBar } = useSnackBar();

  const [seedPhrase, setSeedPhrase] = useState<string>();
  const [isSeedPhraseHidden, setIsSeedPhraseHidden] = useState(true);

  useEffect(() => {
    if (!seedPhrase && entropy) {
      setSeedPhrase(getSeedPhraseFromEntropy(entropy));
    }
  }, [entropy, seedPhrase]);

  const toggleShowSeedPhrase = () =>
    setIsSeedPhraseHidden(prevState => !prevState);
  const copyToClipboard = () => {
    Clipboard.setString(seedPhrase ?? '');
    showSnackBar({
      message: 'Done',
      moreInfo: t('export.phrase.phraseCopied') ?? '',
      type: 'success',
    });
  };
  const goToConfirmPhrase = () =>
    seedPhrase &&
    navigation.navigate('ExportConfirmationPhrase', { seedPhrase });

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
        <QuaiPayButton
          title={
            isSeedPhraseHidden
              ? t('export.phrase.revealPhrase')
              : t('export.phrase.hidePhrase')
          }
          type="secondary"
          titleColor="gray"
          RightIcon={isSeedPhraseHidden ? <EyeOutline /> : <HideIcon />}
          onPress={toggleShowSeedPhrase}
          style={styles.revealButton}
        />
        {seedPhrase && (
          <SeedPhraseDisplay
            hide={isSeedPhraseHidden}
            seedPhrase={seedPhrase}
          />
        )}
        <View style={styles.separator} />
        <QuaiPayButton
          type="secondary"
          title={t('export.phrase.copyToClipboard')}
          titleColor="gray"
          titleType="bold"
          outlined
          RightIcon={<CopyOutline />}
          onPress={copyToClipboard}
          style={styles.copyToClipboardButton}
        />
        <View style={styles.doubleSeparator} />
        <Pressable
          disabled={!seedPhrase}
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
      alignSelf: 'center',
      marginBottom: 24,
    },
    copyToClipboardButton: {
      alignSelf: 'center',
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
