import React from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import {
  QuaiPayButton,
  QuaiPaySettingsContent,
  QuaiPayText,
} from 'src/shared/components';
import { useTranslation } from 'react-i18next';
import { RootNavigator } from 'src/shared/navigation/utils';

export const Feedback = () => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'settings.feedback.landing',
  });

  // TODO: update link
  const goToLearnMore = () =>
    Linking.openURL('https://docs.quai.network/use-quai/wallets');

  const goToSubmit = () =>
    RootNavigator.navigate('SettingsStack', { screen: 'SubmitFeedback' });

  return (
    <QuaiPaySettingsContent
      containerStyle={styles.container}
      title={t('helpAndFeedback')}
    >
      <View style={styles.questionsContainer}>
        <QuaiPayText style={styles.titleText} type="H3">
          {t('title')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('description')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('firstQuestion')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('firstAnswer')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('secondQuestion')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('secondAnswer')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" type="bold">
          {t('thirdQuestion')}
        </QuaiPayText>
        <QuaiPayText themeColor="secondary" style={styles.descriptionText}>
          {t('thirdAnswer')}
        </QuaiPayText>
        <QuaiPayButton
          style={[styles.button, styles.topButton]}
          title={t('contactSupport')}
          outlined
        />
        <QuaiPayButton
          outlined
          onPress={goToSubmit}
          style={styles.button}
          title={t('submitFeedback')}
        />
      </View>
      <QuaiPayButton
        underline
        type="secondary"
        titleType="default"
        title={t('learnMore')}
        onPress={goToLearnMore}
        style={styles.learnMore}
      />
    </QuaiPaySettingsContent>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 16,
  },
  titleText: {
    textAlign: 'left',
  },
  descriptionText: {
    textAlign: 'left',
    marginBottom: 16,
  },
  questionsContainer: {
    width: '100%',
  },
  button: { padding: 0, height: 36 },
  topButton: { marginTop: 36, marginBottom: 8 },
  learnMore: {
    marginHorizontal: 24,
  },
});
