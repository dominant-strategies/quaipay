import React, { useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { QuaiPayContent, QuaiPayText } from 'src/shared/components';
import { Theme } from 'src/shared/types';
import { useThemedStyle } from 'src/shared/hooks/useThemedStyle';
import { RootNavigator } from 'src/shared/navigation/utils';
import { styledColors } from 'src/shared/styles';
import CheckBold from 'src/shared/assets/checkBold.svg';

import { ExportStackScreenProps } from './ExportStack';

export const ExportCheckoutScreen: React.FC<
  ExportStackScreenProps<'ExportCheckout'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'export.checkout' });
  const styles = useThemedStyle(themedStyle);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const toggleAcceptTerms = () => setAcceptedTerms(prevState => !prevState);

  // TODO: update to use the actual page
  const goToLearnMoreRecovery = () =>
    Linking.openURL('https://docs.quai.network/use-quai/wallets');
  const goToSeedPhraseScreen = () => navigation.navigate('ExportPhrase');
  const goToSettings = () =>
    RootNavigator.navigate('Main', { screen: 'Settings' });

  return (
    <QuaiPayContent>
      <View style={styles.container}>
        <QuaiPayText type="H1">{t('title')}</QuaiPayText>
        <View style={styles.separator} />
        <QuaiPayText type="paragraph" themeColor="secondary">
          {t('description')}
        </QuaiPayText>
        <View style={styles.separator} />
        <QuaiPayText type="paragraph" themeColor="secondary">
          {t('otherParagraph')}
        </QuaiPayText>
        <Pressable
          onPress={goToLearnMoreRecovery}
          style={({ pressed }) => [
            styles.learnMoreContainer,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText style={styles.learnMoreText} themeColor="secondary">
            {t('learnMore')}
          </QuaiPayText>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          onPress={toggleAcceptTerms}
          style={styles.acceptTermsContainer}
        >
          <View style={styles.checkBoldContainer}>
            {acceptedTerms ? (
              <CheckBold />
            ) : (
              <View style={styles.checkBoldBlank} />
            )}
          </View>
          <QuaiPayText style={styles.acceptTermsText} themeColor="secondary">
            {t('acceptTerms')}
          </QuaiPayText>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          onPress={goToSeedPhraseScreen}
          style={({ pressed }) => [
            styles.button,
            styles.reviewButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="H3">{t('reviewSeedPhrase')}</QuaiPayText>
        </Pressable>
        <Pressable
          disabled={!acceptedTerms}
          onPress={goToSettings}
          style={({ pressed }) => [
            styles.button,
            !acceptedTerms && styles.disabledButton,
            pressed && { opacity: 0.5 },
          ]}
        >
          <QuaiPayText type="H3" style={styles.whiteColor}>
            {t('complete')}
          </QuaiPayText>
        </Pressable>
        <View style={styles.separator} />
      </View>
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
    },
    textContainer: {
      alignItems: 'center',
      marginBottom: 20,
    },
    button: {
      marginBottom: 20,
      padding: 10,
      marginHorizontal: 12,
      backgroundColor: theme.normal,
      borderRadius: 8,
    },
    reviewButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.secondary,
      marginBottom: 16,
    },
    disabledButton: {
      backgroundColor: theme.secondary,
    },
    separator: {
      flex: 1,
    },
    whiteColor: {
      color: styledColors.white,
    },
    learnMoreContainer: {
      paddingVertical: 10,
      marginHorizontal: 24,
    },
    learnMoreText: {
      textDecorationLine: 'underline',
    },
    acceptTermsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      gap: 16,
    },
    acceptTermsText: {
      flexShrink: 1,
      textAlign: 'left',
    },
    checkBoldContainer: {
      borderWidth: 1,
      borderColor: theme.border,
    },
    checkBoldBlank: {
      height: 24,
      width: 24,
    },
  });
