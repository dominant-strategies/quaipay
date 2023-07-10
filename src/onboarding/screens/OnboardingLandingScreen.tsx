/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import Logo from 'src/shared/assets/logo.svg';
import { fontStyle, buttonStyle, styledColors } from 'src/shared/styles';
import { QuaiPayButton } from 'src/shared/components';
import { useTheme } from 'src/shared/context/themeContext';

import { OnboardingStackScreenProps } from '../OnboardingStack';

export const OnboardingLandingScreen: React.FC<
  OnboardingStackScreenProps<'OnboardingLanding'>
> = ({ navigation }) => {
  const { isDarkMode } = useTheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    width: '100%',
    height: '100%',
  };

  const topViewStyle = {
    backgroundColor: isDarkMode ? styledColors.black : styledColors.white,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  };

  const goToOnboardingTerms = () => navigation.navigate('OnboardingTerms');

  const goToLogin = () => navigation.navigate('LoginLanding');

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={topViewStyle}>
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
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum
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
        {/* </LinearGradient> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
