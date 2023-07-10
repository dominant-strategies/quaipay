/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Logo from 'src/shared/assets/logo.svg';
import { fontStyle, buttonStyle } from 'src/shared/styles';
import { QuaiPayButton, QuaiPayContent } from 'src/shared/components';
import { useThemedStyle } from 'src/shared/hooks';
import { useTheme } from 'src/shared/context/themeContext';
import { Theme } from 'src/shared/types';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const OnboardingLandingScreen: React.FC<
  OnboardingStackScreenProps<'OnboardingLanding'>
> = ({ navigation }) => {
  const { isDarkMode } = useTheme();
  const styles = useThemedStyle(themedStyle);

  const goToOnboardingTerms = () => navigation.navigate('OnboardingTerms');

  const goToLogin = () => navigation.navigate('LoginLanding');

  return (
    <QuaiPayContent noNavButton containerStyle={styles.mainContainer}>
      <View style={styles.tripleSeparator} />
      <View style={styles.welcomeLogoView}>
        <Logo />
      </View>
      <View style={styles.welcomeTitleView}>
        <Text
          style={{
            ...fontStyle.fontH1,
            ...styles.welcomeTitle,
            color: isDarkMode ? Colors.white : Colors.black,
          }}
        >
          Welcome to{'\n'}QuaiPay.
        </Text>
      </View>
      <View style={styles.welcomeDescriptionView}>
        <Text
          style={{ ...fontStyle.fontParagraph, ...styles.welcomeDescription }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum
        </Text>
      </View>
      <View style={styles.loginActionSectionView}>
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
          style={styles.loginSection}
          onPress={goToLogin}
        />
      </View>
      <View style={styles.separator} />
    </QuaiPayContent>
  );
};

const themedStyle = (theme: Theme) =>
  StyleSheet.create({
    mainContainer: {
      backgroundColor: theme.normal,
    },
    separator: {
      flex: 1,
    },
    tripleSeparator: {
      flex: 3,
    },
    highlight: {
      fontWeight: '700',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
    },
    welcomeLogoView: {
      alignItems: 'center',
      marginBottom: 25,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    welcomeTitleView: {
      alignItems: 'center',
      marginBottom: 25,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    welcomeTitle: {
      verticalAlign: 'middle',
      paddingHorizontal: 70,
    },
    loginActionSectionView: {},
    loginSection: {
      marginTop: 15,
    },
    welcomeDescriptionView: {
      marginBottom: 50,
    },
    welcomeDescription: {
      color: '#808080',
      verticalAlign: 'middle',
      textAlign: 'center',
      marginLeft: 30,
      marginRight: 30,
      paddingHorizontal: 20,
    },
  });
