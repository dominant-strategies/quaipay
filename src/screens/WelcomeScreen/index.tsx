/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
// import { useNavigation } from '@react-navigation/native';
// import { HomeScreenNavigationProp } from '../navigation/types';

type WelcomeTitleProps = PropsWithChildren<{
}>;

function WelcomeTitle({children}: WelcomeTitleProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {
  };
  return (
    <View style={styles.welcomeTitleView}>
      <Text style={styles.welcomeTitle}>
        {children}
      </Text>
    </View>
  );
}

type WelcomeDescriptionProps = PropsWithChildren<{
}>;

function WelcomeDescription({children}: WelcomeDescriptionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {
  };
  return (
    <View style={styles.welcomeDescriptionView}>
      <Text style={styles.welcomeDescription}>
        {children}
      </Text>
    </View>
  );
}
type LoginActionSectionProps = PropsWithChildren<{
}>;

function LoginActionSection({children}: LoginActionSectionProps): JSX.Element {
    // const navigation = useNavigation<HomeScreenNavigationProp>();
  const isDarkMode = useColorScheme() === 'dark';
  const textColor = {
  };

  const onPressLogin = () => {

  }

  return (
    <View style={styles.loginActionSectionView}>
        <Button
            onPress={() => {
                // navigation.navigate('Setup');
              }}
            title="Setup"
            color={Colors.black}
        />
        <Text 
            style={styles.loginSection} 
            onPress={onPressLogin}>
            Already have an account? Click here to login.
        </Text>
    </View>
  );
}
function WelcomeScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    marginLeft: 10, marginRight: 10, marginTop: 'auto', marginBottom: 'auto'
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={backgroundStyle}>
        <WelcomeTitle>Welcome to Quai Pay.</WelcomeTitle>
        <WelcomeDescription>
          Lorem ipsum dolor sit amet, consectetur 
          adipiscing elit. Etiam eu turpis molestie, dictum 
          est a, mattis tellus. Sed dignissim, metus nec 
          fringilla accumsan, risus sem sollicitudin lacus, ut 
          interdum tellus elit sed risus. Maecenas eget 
          condimentum
        </WelcomeDescription>
        <LoginActionSection />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
  },
  welcomeTitleView: {
  },
  welcomeTitle: {
    color: Colors.black,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '600',
  },
  loginActionSectionView: {
    marginTop: 40,
  },
  loginSection: {
    color: Colors.black,
    verticalAlign: 'middle',
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 30,
  },
  welcomeDescriptionView: {
    marginTop: 40,
  }, 
  welcomeDescription: {
    color: Colors.light,
    verticalAlign: 'middle',
    textAlign: 'center',
    fontSize: 16,
    marginLeft: 30,
    marginRight: 30,
    lineHeight: 20
  }
});

export default WelcomeScreen;
