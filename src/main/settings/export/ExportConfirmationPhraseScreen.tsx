import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { styledColors } from 'src/shared/styles';

import { ExportStackScreenProps } from './ExportStack';
import { SeedPhraseConfirmation } from './components/SeedPhraseConfirmation';

export const ExportConfirmationPhraseScreen: React.FC<
  ExportStackScreenProps<'ExportConfirmationPhrase'>
> = ({
  navigation,
  route: {
    params: { seedPhrase },
  },
}) => {
  const { t } = useTranslation();
  const styles = useThemedStyle(themedStyle);
  const { showSnackBar } = useSnackBar();
  const [proposedSeedPhraseWords, setProposedSeedPhraseWords] = useState<
    string[]
  >([]);

  const proposedSeedPhrase = proposedSeedPhraseWords.join(' ');
  const isPhraseComplete =
    proposedSeedPhrase.length === seedPhrase.split('').length;
  const isPhraseOk = seedPhrase === proposedSeedPhrase;

  const handleCTAPress = () =>
    isPhraseOk ? goToCheckout() : popWrongPhraseMessage();
  const popWrongPhraseMessage = () =>
    showSnackBar({ message: t('export.confirmation.wrongPhraseMessage') });
  const goToCheckout = () => navigation.navigate('ExportCheckout');

  return (
    <QuaiPayContent>
      <ScrollView>
        <View style={styles.textContainer}>
          <QuaiPayText type="H1">{t('export.confirmation.title')}</QuaiPayText>
          <QuaiPayText type="H3">
            {t('export.confirmation.description')}
          </QuaiPayText>
        </View>
        <SeedPhraseConfirmation
          seedPhrase={seedPhrase}
          result={proposedSeedPhraseWords}
          setResult={setProposedSeedPhraseWords}
        />
        <View style={styles.separator} />
        <Pressable
          onPress={handleCTAPress}
          disabled={!isPhraseComplete}
          style={({ pressed }) => [
            styles.continueButton,
            !isPhraseOk && styles.disabledButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText style={styles.whiteColor}>
            {t('common.continue')}
          </QuaiPayText>
        </Pressable>
      </ScrollView>
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    textContainer: {
      flex: 1,
      alignItems: 'center',
      marginBottom: 20,
      marginHorizontal: 48,
    },
    continueButton: {
      marginBottom: 70,
      padding: 10,
      marginHorizontal: 30,
      backgroundColor: theme.normal,
    },
    separator: {
      height: 86,
    },
    whiteColor: {
      color: styledColors.white,
    },
    disabledButton: {
      backgroundColor: theme.secondary,
    },
  });
