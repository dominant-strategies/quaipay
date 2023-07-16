import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { useSnackBar } from 'src/shared/context/snackBarContext';
import { styledColors } from 'src/shared/styles';

import { ExportStackScreenProps } from './ExportStack';
import {
  SeedPhraseConfirmation,
  getIndexesToConfirm,
} from './components/SeedPhraseConfirmation';

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

  const indexesToConfirm = useMemo(
    () => getIndexesToConfirm(seedPhrase),
    [seedPhrase],
  );

  const expectedWords = useMemo(
    () =>
      seedPhrase
        .split(' ')
        .filter((_, idx) => indexesToConfirm.find(index => index === idx)),
    [seedPhrase],
  );

  const isPhraseComplete =
    proposedSeedPhraseWords.length === expectedWords.length;
  const isPhraseOk =
    expectedWords.join(' ') === proposedSeedPhraseWords.join(' ');

  const handleCTAPress = () =>
    isPhraseOk ? goToCheckout() : popWrongPhraseMessage();
  const popWrongPhraseMessage = () =>
    showSnackBar({
      message: t('export.confirmation.wrongPhraseMessage.main'),
      moreInfo: t('export.confirmation.wrongPhraseMessage.moreInfo') ?? '',
      type: 'error',
    });
  const goToCheckout = () => navigation.navigate('ExportCheckout');

  return (
    <QuaiPayContent>
      <ScrollView>
        <View style={styles.textContainer}>
          <QuaiPayText type="H1">{t('export.confirmation.title')}</QuaiPayText>
          <QuaiPayText type="H3">
            {t('export.confirmation.description')}
            {/* TODO: review proper copy for this section */}
            {`\n\nInput the words with position ${indexesToConfirm
              .map(value => value + 1)
              .join(', ')} in the right order.`}
          </QuaiPayText>
        </View>
        <SeedPhraseConfirmation
          seedPhrase={seedPhrase}
          result={proposedSeedPhraseWords}
          setResult={setProposedSeedPhraseWords}
          indexesToConfirm={indexesToConfirm}
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
