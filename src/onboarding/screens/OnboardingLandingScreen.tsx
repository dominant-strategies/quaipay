import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Logo from 'src/shared/assets/logo.svg';
import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayText,
} from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks';
import { styledColors } from 'src/shared/styles';
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
  const goToReferral = () => navigation.navigate('OnboardingReferralScan');
  const goToLogin = () => navigation.navigate('LoginLanding');

  return (
    <QuaiPayContent
      noNavButton
      style={styles.backgroundColor}
      containerStyle={styles.mainContainer}
    >
      <StatusBar barStyle={'light-content'} backgroundColor={'transparent'} />
      <View style={styles.tripleSeparator} />
      <View style={styles.logoContainer}>
        <Logo />
      </View>
      <View style={styles.separator} />
      <View style={styles.body}>
        <QuaiPayText type="H1" style={styles.text}>
          {t('title')}
        </QuaiPayText>
        <QuaiPayText style={styles.text}>{t('description')}</QuaiPayText>
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
          titleColor="white"
          title={t('referralButton')}
          onPress={goToReferral}
        />
        <QuaiPayButton
          title={t('loginButton')}
          titleType="default"
          type="secondary"
          titleColor="white"
          underline
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
      marginBottom: 18,
    },
    body: {
      gap: 8,
      width: '100%',
    },
    text: {
      textAlign: 'left',
      marginHorizontal: 8,
      color: styledColors.white,
    },
  });
