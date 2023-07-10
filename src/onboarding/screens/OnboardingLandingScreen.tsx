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
    <QuaiPayContent
      noNavButton
      style={styles.backgroundColor}
      containerStyle={styles.mainContainer}
    >
      <View style={styles.tripleSeparator} />
      <Logo />
      <View style={styles.separator} />
      <View style={styles.titleContainer}>
        <Text
          style={{
            ...fontStyle.fontH1,
            ...styles.title,
            color: isDarkMode ? Colors.white : Colors.black,
          }}
        >
          Welcome to{'\n'}QuaiPay.
        </Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={{ ...fontStyle.fontParagraph, ...styles.description }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
          turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec
          fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus
          elit sed risus. Maecenas eget condimentum
        </Text>
      </View>
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
      verticalAlign: 'middle',
      paddingHorizontal: 70,
    },
    loginButton: {
      marginTop: 15,
    },
    descriptionContainer: {
      marginBottom: 50,
    },
    description: {
      color: '#808080',
      verticalAlign: 'middle',
      textAlign: 'center',
    },
  });
