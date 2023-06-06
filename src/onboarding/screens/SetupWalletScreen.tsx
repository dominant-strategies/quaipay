/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { fontStyle, buttonStyle, styledColors } from 'src/shared/styles';
import Loader from 'src/shared/Loader';

import { setUpWallet } from '../services/setUpWallet';

type SetupWalletScreenProps = {
  navigation: any;
};

function SetupWalletScreen({ navigation }: SetupWalletScreenProps) {
  const isDarkMode = useColorScheme() === 'dark';
  const [settingUpWallet, setSettingUpWallet] = useState(false);

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

  const onPressSetup = useCallback(async () => {
    try {
      setSettingUpWallet(true);
      await setUpWallet();

      navigation.navigate('SetupNameAndPFP');
    } catch (err) {
      if (err instanceof Error) {
        console.log('failed to set up wallet', err.message, err.stack);
      } else {
        console.log('failed to set up wallet', err);
      }
    } finally {
      setSettingUpWallet(false);
    }
  }, [navigation]);

  if (settingUpWallet) {
    return <Loader text="Setting up wallet" />;
  }
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={topViewStyle}>
        <View style={styles.welcomeLogoView}>
          <Image
            source={require('../../shared/assets/logo.png')}
            style={{ width: 160, height: 160, alignContent: 'center' }}
          />
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
            onPress={onPressSetup}
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
          <Text
            style={{ ...fontStyle.fontSmallText, ...styles.loginSection }}
            onPress={() => {
              // navigation.navigate('Login');
            }}
          >
            Already have an account? Click here to login.
          </Text>
        </View>
        {/* </LinearGradient> */}
      </View>
    </SafeAreaView>
  );
}

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
    color: Colors.black,
    verticalAlign: 'middle',
    textDecorationLine: 'underline',
    textAlign: 'center',
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

export default SetupWalletScreen;
