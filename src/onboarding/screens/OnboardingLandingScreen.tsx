import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Logo from 'src/shared/assets/logo.svg';
import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayText,
} from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks';
import { Theme } from 'src/shared/types';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const OnboardingLandingScreen: React.FC<
  OnboardingStackScreenProps<'OnboardingLanding'>
> = ({ navigation }) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.landing',
  });
  const styles = useThemedStyle(themedStyle);

  const goToOnboardingTerms = () => navigation.navigate('OnboardingTerms');
  // TODO: add referral screen
  const goToReferral = () => false;
  const goToLogin = () => navigation.navigate('LoginLanding');

  return (
    <QuaiPayContent
      noNavButton
      style={styles.backgroundColor}
      containerStyle={styles.mainContainer}
    >
      <View style={styles.tripleSeparator} />
      <Logo />
      <View style={styles.separator} />
      <View style={styles.body}>
        <QuaiPayText type="H1" style={styles.title}>
          {t('title')}
        </QuaiPayText>
        <QuaiPayText style={styles.description}>{t('description')}</QuaiPayText>
        <QuaiPayButton
          type="secondary"
          bgColor="white"
          titleColor="normal"
          title={t('setupButton')}
          onPress={goToOnboardingTerms}
        />
        <QuaiPayButton
          outlined
          type="secondary"
          title={t('referralButton')}
          onPress={goToReferral}
        />
        <QuaiPayButton
          title="Already have an account? Click here to login."
          titleType="default"
          type="secondary"
          underline
          style={styles.loginButton}
          onPress={goToLogin}
        />
      </View>
      <View style={styles.separator} />
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    backgroundColor: {
      backgroundColor: theme.normal,
    },
    mainContainer: {
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    separator: {
      flex: 1,
      marginVertical: 1,
    },
    tripleSeparator: {
      flex: 3,
      marginVertical: 1,
    },
    logoContainer: {
      marginBottom: 25,
    },
    title: {
      textAlign: 'left',
    },
    body: {
      gap: 8,
      width: '100%',
    },
    loginButton: {
      marginTop: 15,
    },
    description: {
      textAlign: 'left',
      marginHorizontal: 8,
    },
  });
