/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import Logo from 'src/shared/assets/logo.svg';
import { fontStyle, buttonStyle } from 'src/shared/styles';
import {
  QuaiPayButton,
  QuaiPayContent,
  QuaiPayText,
} from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks';
import { useTheme } from 'src/shared/context/themeContext';
import { Theme } from 'src/shared/types';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const OnboardingLandingScreen: React.FC<
  OnboardingStackScreenProps<'OnboardingLanding'>
> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const { t } = useTranslation('translation', {
    keyPrefix: 'onboarding.landing',
  });
  const styles = useThemedStyle(themedStyle);

  const goToOnboardingTerms = () => navigation.navigate('OnboardingTerms');

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
      <View style={styles.titleContainer}>
        <QuaiPayText type="H1" style={styles.title}>
          {t('title')}
        </QuaiPayText>
        <QuaiPayText style={styles.description}>{t('description')}</QuaiPayText>
      <View>
        <TouchableOpacity
          style={{ marginLeft: 21, marginRight: 21 }}
          onPress={goToOnboardingTerms}
        >
          <Text
            style={{
              ...fontStyle.fontH3,
              ...(isDarkMode ? buttonStyle.white : buttonStyle.normal),
              borderRadius: 30,
            }}
          >
            {' '}
            Setup{' '}
          </Text>
        </TouchableOpacity>
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
    titleContainer: {
      marginBottom: 25,
    },
    title: {
      textAlign: 'left',
    },
    loginButton: {
      marginTop: 15,
    },
    description: {
      textAlign: 'left',
      marginHorizontal: 8,
    },
  });
